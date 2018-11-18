#!/usr/bin/env python
import sys
import requests
import shutil

with open(sys.argv[1]) as f:
    for line in f.readlines():
        if line.startswith("![]"):
            url = line.strip()[4:-1]
            print url
            r = requests.get(url, stream=True)
            if r.status_code == 200:
              	filename = url.split('/')[-1]
                with open('%s/%s' % (sys.argv[2], filename), 'wb') as w:
        			r.raw.decode_content = True
        			shutil.copyfileobj(r.raw, w) 
            else:
                print 'Error downloading image (%s): %d' % (url, r.status_code)
