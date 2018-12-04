---
layout: post
title:  "Instapaper Outage Cause & Recovery"
date:   2017-02-14
excerpt_separator: <!--more-->
---

The Instapaper service experienced [an extended outage](http://blog.instapaper.com/post/157027537441) between Wednesday, February 9 at 12:30PM PT through Thursday, February 10 at 7:30pm PT. We brought the Instapaper service back up with [limited access to archives](http://blog.instapaper.com/post/157045376396) as a short-term solution while we worked to restore the service completely. Today, February 14, we completed the full recovery of the service.

The critical system that failed was our MySQL database, which we run as a hosted solution on Amazon’s [Relational Database Service (RDS)](https://aws.amazon.com/rds/). Here we’ll cover what went wrong, how we resolved the issue and what we’re doing to improve reliability moving forward...

<!--more-->

### **Root cause**

In short, the data failure was caused by a [2TB file size limit](http://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_Limits.html) for RDS instances created before April 2014\. On Wednesday, February 9 at 12:30PM PT our “bookmarks” table that stores articles saved by Instapaper users exceeded the 2TB file size limit. Subsequent attempts to insert new entries into the bookmarks table began to throw the following error:

The reason this limitation exists is because MySQL RDS instances created before April 2014 used an [ext3 filesystem](https://en.wikipedia.org/wiki/Ext3) which has a 2TB file size limit. Instances created after April 2014 are backed by an [ext4 filesystem](https://en.wikipedia.org/wiki/Ext4) and subject to a 6TB file size limit.

### **Instapaper RDS history**

In April 2013, [betaworks acquired Instapaper](https://marco.org/2013/04/25/instapaper-next-generation) from Marco Arment. After the acquisition, we moved Instapaper from [Softlayer](http://www.softlayer.com/) to [Amazon Web Services](https://aws.amazon.com/) because all betaworks companies run on AWS so the engineers have expertise in that platform. To perform the migration, betaworks worked with two of their regular devops contractors. After the migration, operations were handed off to the newly-formed Instapaper team, and operating responsibilities fell on our director of engineering. After our director of engineering left the company in October 2014, I took over backend operations.

Our original instance, created in June 2013, was experiencing some performance issues during its backup window in early 2015\. AWS support confirmed we were running on older hardware and an older version MySQL v5.6.18\. If we upgraded to a more recent version (v5.6.19+), according to AWS, the issue would be resolved.

In March 2015, we created a read replica of our June 2013 RDS instance, upgraded the MySQL version and performed the cutover switch in the middle of the night with minimal downtime — roughly 5 minutes. Although this instance was created after April 2014, it was created as a read replica from the original June 2013 RDS instance, and, as such, inherited the same filesystem and 2TB file size limitation.

### **Prevention**

Without knowledge of the pre-April 2014 file size limit, it was difficult to foresee and prevent this issue. As far as we can tell, there’s no information in the RDS console in the form of monitoring, alerts or logging that would have let us know we were approaching the 2TB file size limit, or that we were subject to it in the first place. Even now, there’s nothing to indicate that our hosted database has a critical issue.

If we ever had knowledge of the file size limit, it likely left with the 2013-era betaworks contractors that performed the Softlayer migration. As far as we can tell, there are only two ways that we, as RDS customers, could have prevented this issue.

First, we could have performed a complete dump of the database to disk, and then restored the database to a new RDS instance. In this scenario, we’d likely need to work directly with Amazon to set the new RDS instance as a read replica of the old one and then perform the cutover.

The other option would have been to set up a read replica running [Amazon Aurora](https://aws.amazon.com/rds/aurora), Amazon’s managed SQL-compatible database system. We’d previously considered migrating to Aurora (mostly because of the cost savings), however Aurora runs exclusively within a VPC, and Instapaper still runs on EC2-classic.

Ultimately, it’s unlikely that we would have performed either of those operations without knowledge of the limitation.

### **Backups**

One of the great features of RDS is automated, daily backups of your database instances. We store 10 days of backups for our MySQL database. However, since those backups are all filesystem snapshots, they’re also subject to the 2TB file size limit.

### **Limited service restoration**

We didn’t have a good disaster recovery plan in the event our MySQL instance failed with a critical filesystem issue that all of our backups were also subject to.

After a long phone call with AWS support and discussing the limitation with Pinterest’s Site Reliability engineers, we understood that our only path forward was to rebuild our 2.5TB database using a complete dump and restore. As quickly as possible, Pinterest’s SRE team guided us through dumping Instapaper’s production database to a 5.5TB RAID-0 disk provided by an i2.8xlarge instance.

When it became clear the dump would take far too long (first effort took 24 hours, second effort with parallelization took 10 hours), we began executing on a contingency plan to get an instance in a working state with limited access to Instapaper’s archives. This short-term solution launched into production after 31 hours of downtime. The total time to create that instance and launch it into production was roughly six hours.

Given that we didn’t have a plan for this type of event, we didn’t have a good understanding of the time required to dump and restore our database. Our initial estimate for the database dump was six to eight hours. However, we made that estimate using the number of rows, and later learned the first 25 percent of Instapaper bookmarks account for only 10 percent of overall data. We could have drastically cut our initial day of downtime if we understood that rebuilding the database would be a multi-day effort and that we needed to launch directly into limited service restoration.

### **Data restoration**

Once the service was back up and the data dumps completed, the next step was to import all of the dumps into an instance that wasn’t subject to the 2TB file size limit. We worked closely with RDS engineers throughout the weekend to accomplish this with two parallel workflows:

1.  Set up an Aurora read replica of the old database. We agreed using Aurora was risky because we hadn’t thoroughly tested it against the Instapaper codebase, but it was very low friction to set up. The read replica completed in about 24 hours.
2.  Create a new MySQL RDS instance, import all of the data without secondary indexes (8 hours) and create three secondary indexes after the data was imported (each secondary index took roughly 16 hours). At the time of this post, the last secondary index was still being created.

After realizing that the secondary index creation was taking an unacceptably long time, one of the Amazon engineers mounted an ext4 filesystem to our failed production database and performed an rsync between the ext3 filesystem and ext4 filesystem. The rsync ran in roughly 8 hours, which ultimately got us a new, ext4-backed database instance with all of the data and indexing restored.

### **Syncing with temporary production database**

Using the binary logs from the temporary production database (with limited archives), RDS engineers set up the new ext4-backed database with row-based replication to the temporary production database in order to sync up with the changes made between Thursday and Monday. The total time for this replication was roughly three hours.

### **Full service restoration**

Once we had the new ext4-backed database with full data and indexes synced up to the temporary production database, the final step was to promote the new database to master and deploy the application code to point to the new database.

We performed the restoration without losing any of our users’ older articles, changes made to more recent articles or articles saved after recovering from the outage.

### **Reflections**

This is any web application developer’s worst nightmare. A filesystem-based limitation we weren’t aware of and had no visibility into rendered not only our production database useless, but all our backups, too. Our only recourse was to restore the data to an entirely new instance on a new filesystem. This was further complicated by the fact that our only interface into the hosted instances is MySQL, which made filesystem-level solutions like rsync impossible without the direct assistance from Amazon engineers.

Even if we had executed perfectly, from the moment we diagnosed the issue to the moment we had a fully rebuilt database, the total downtime would have been at least 10 hours. Of course, that’s significantly less than the 31 hours of total downtime and five days of limited access, but we’d like to illustrate the severity of this type of issue even in a perfect world.

We’re firm in our belief that this issue was difficult to foresee and prevent, but the lack of a disaster recovery plan for this type of issue resulted in longer downtimes and recovery times than necessary. Additionally, there were several steps we could have taken from a communications perspective, both internally at Pinterest and with the Amazon Web Services team, in order to better leverage the resources at our disposal.

### **Action items**

As part of our retrospective process at Pinterest, we’re defining a better workflow for system-wide Instapaper outages that escalate issues immediately to Pinterest’s Site Reliability Engineering team.

Additionally, we’re going to be more aggressive with testing our MySQL backups. We used to test backups every three months, and now we’ll test every month.

Neither of the above action items would have prevented this issue, but they’ll help accelerate our response times in the event of an outage and are good practices.

### **Relational database service**

We’ll continue to use Amazon’s Relational Database Service for now. While it’s frustrating to experience an issue without warning or visibility, RDS has been a reliable and robust service for Instapaper for several years, and handled snapshots, failovers, read replication and other tasks without any engineering overhead from the Instapaper team.

Additionally, the RDS team has been incredibly helpful in expediting our full recovery. They even took a feature request from us with respect to adding some additional information about ext3-backed databases.

### **Accountability**

I take full responsibility for the incident and the downtime. While the information about the 2TB limitation wasn’t directly available to me, it’s my responsibility to understand the limitations of the technologies I’m using in my day-to-day operations, even if those technologies are hosted by another company. Additionally, I take responsibility for the lack of an appropriate disaster recovery plan and will be working closely with Pinterest’s Site Reliability Engineering team to ensure we have a process in place to recover from this type of failure in the event it ever happens again.

