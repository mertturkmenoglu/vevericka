export const UserFeedAction = {
  SHARE_LINK_COPIED: 'SHARE_LINK_COPIED',
  SHARE_DM: 'SHARE_DM',
  POST_SAVED: 'POST_SAVED',
  POST_DELETED: 'POST_DELETED',
  USER_UNFOLLOWED: 'USER_UNFOLLOWED',
};

export const UserFeedActionMessageKey: Record<string, string> = {
  SHARE_LINK_COPIED: 'home_page.snackbar.messages.post_link_copied',
  SHARE_DM: 'home_page.snackbar.messages.message_sent',
  POST_SAVED: 'home_page.snackbar.messages.saved',
  POST_DELETED: 'home_page.snackbar.messages.post_deleted',
  USER_UNFOLLOWED: 'home_page.snackbar.messages.unfollowed',
};
