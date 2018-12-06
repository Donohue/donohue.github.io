---
layout: post
title:  "Open Source: IPShortcut"
date:   "2018-12-06"
excerpt_separator: <!--more-->
---

It took a considerable amount of effort to support Smart Keyboard shortcuts for [Instapaper 7.7](http://blog.instapaper.com/post/180862689796). Given that most of the functionality is basic for keyboard-enabled computers and not specific to Instapaper, I decided to open source a library called [IPShortcut](https://github.com/Instapaper/IPShortcut) to automatically enable this functionality on view controllers displaying `UITableView`, `UICollectionView`, or `UIScrollView`.

Most of the functionality supported is simple...

<!--more-->

* Arrow keys to navigate items in a table or collection (or scroll for scrollviews).
* Enter to open an item in a table or collection.
* Space and shift+space to scroll a page down or up.

Since I wanted to support the basic navigation functionality on many view controllers in Instapaper, I decided to encapsulate the shortcut logic into its own view controllers, and have the Instapaper view controllers be derived from the shortcut view controllers. This allowed for minimal changes to Instapaper view controllers to support the functionality...

```
@interface ArticlesViewController : IPShortcutCollectionViewController
```

Changing the parent view controller class is the only change necessary to support the above functionality on the article list view in Instapaper. To add the Instapaper-specific functionality on `ArticlesViewController` is as straightforward as providing its own `keyCommands` function that adds the additional shortcuts:

```
- (NSArray<UIKeyCommand *>*)keyCommands {
    NSMutableArray *allCommands = [[super keyCommands] mutableCopy];
    NSArray *keyCommands = @[
        [UIKeyCommand keyCommandWithInput:@"a" modifierFlags:UIKeyModifierCommand action:@selector(keyArchiveArticle:) discoverabilityTitle:NSLocalizedString(@"Archive", nil)],
        ...];
    [allCommands addObjectsFromArray:keyCommands];
    return allCommands;
}
```

The library leverages the `selectedIndexPaths` of a `UITableView` or `UICollectionView` to determine the current cursor position, which position to move the cursor next, and to display the cursor functionality by leveraging the cell's selected state. If no index paths are selected, the library will select the first completely visible cell on key down, or the last completely visible cell on key up. When pressing the enter key, the library calls the appropriate delegate method for UITableView or UICollectionView to provide the `didSelect` functionality.

For the page down (spacebar) and page up (shift+spacebar) functionality, the library scrolls a bit less than the entire screen so there's some context from the previous screen still on the page. For `UIScrollView` this can be customized by overriding `-(CGFloat)scrollWithinPageMargin` to provide your own margin. For `UITableView` or `UICollectionView` this is handled automatically by showing the last row of the previous page as the first row of the next page.

[IPShortcut](https://github.com/Instapaper/IPShortcut) is available on Cocoapods, so you just need to add the following to your Podfile to get started:

```
pod 'IPShortcut'
```

If you have any thoughts or questions, feel free to reach out to me on [Twitter](https://twitter.com/bthdonohue) or via email to [brian@team.instapaper.com](brian@team.instapaper.com)
