/*
 * rootStore store
 *
 */

import { types as t } from 'mobx-state-tree'
import { makeDebugger } from '../../utils'

import RouteStore from '../RouteStore'

import CommunitiesStore from '../CommunitiesStore'
import { ThemeStore, ThemeDefaults } from '../ThemeStore'

import {
  // domain
  UsersStore,
  AccountStore,
  BodylayoutStore,
  PostsStore,
  ApiLayoutStore,
  HeaderStore,
  CurCommunity,
  // banner
  CommunitiesBannerStore,
  CommunityBannerStore,
  UsersBannerStore,
  // content
  CommunitiesContentStore,
  CommunityContentStore,
  UsersContentStore,
  // editors
  CommunityEditorStore,
  TagEditorStore,
  CategoryEditorStore,
  CategorySetterStore,

  // viewers
  ArticleViwerStore,
  AccountViewerStore,
  CommentsStore,
  // toolbox
  DoraemonStore,
  PreviewStore,
  SidebarStore,
  TypeWriterStore,
  AccountEditorStore,
} from '../storeIndex'

/* eslint-disable no-unused-vars */
const debug = makeDebugger('S:rootStore')
/* eslint-enable no-unused-vars */

const rootStore = t
  .model({
    // domain stores
    version: t.optional(t.string, '0.0.4'),
    account: t.optional(AccountStore, {}),
    users: t.maybe(UsersStore),
    route: t.optional(RouteStore, {}),
    curCommunity: t.optional(CurCommunity, {}),
    communities: t.optional(CommunitiesStore, {}),
    posts: t.optional(PostsStore, {}),
    comments: t.optional(CommentsStore, {}),
    theme: t.optional(ThemeStore, ThemeDefaults),
    appLocale: t.optional(t.enumeration('locale', ['zh', 'en']), 'zh'),
    appLangs: t.map(t.frozen),

    // toolbox
    sidebar: t.optional(SidebarStore, { menuItems: [] }),
    preview: t.optional(PreviewStore, { visible: false }),
    doraemon: t.optional(DoraemonStore, {}),

    // layouts
    bodylayout: t.optional(BodylayoutStore, {}),
    apiLayout: t.optional(ApiLayoutStore, {}),
    header: t.optional(HeaderStore, {}),

    // banner
    communitiesBanner: t.optional(CommunitiesBannerStore, {}),
    communityBanner: t.optional(CommunityBannerStore, {}),
    usersBanner: t.optional(UsersBannerStore, {}),

    // content
    communitiesContent: t.optional(CommunitiesContentStore, {}),
    communityContent: t.optional(CommunityContentStore, {}),
    usersContent: t.optional(UsersContentStore, {}),

    // eiditors
    typeWriter: t.optional(TypeWriterStore, {}),
    accountEditor: t.optional(AccountEditorStore, {}),
    communityEditor: t.optional(CommunityEditorStore, {}),
    tagEditor: t.optional(TagEditorStore, {}),
    categoryEditor: t.optional(CategoryEditorStore, {}),
    categorySetter: t.optional(CategorySetterStore, {}),

    // viewers (for preview usage)
    articleViwer: t.optional(ArticleViwerStore, {}),
    accountViewer: t.optional(AccountViewerStore, {}),
  })
  .views(self => ({
    get locale() {
      return self.appLocale
    },
    get langs() {
      return self.appLangs
    },
    get langMessages() {
      // TODO: try - catch
      // return self.langs.toJSON()[self.appLocale]
      return self.langs.get(self.locale)
    },
    get doraemonVisible() {
      // TODO self.doraemon.visible
      return self.doraemon.visible
    },
    // TODO: remove it
    get curPath() {
      return self.route.curPath
    },
    // TODO: rename to routeInfo
    get curRoute() {
      return self.route.curRoute
    },
    get accountInfo() {
      return self.account.accountInfo
    },
  }))
  .actions(self => ({
    afterCreate() {
      // self.communities.load()
      self.sidebar.load()
      // self.posts.load()
    },

    setHeaderFix(fix) {
      self.header.setFix(fix)
    },
    openDoraemon() {
      self.doraemon.open()
    },
    openPreview(type) {
      self.preview.open(type)
    },
    closePreview() {
      self.preview.close()
    },
    changeTheme(name) {
      self.theme.changeTheme(name)
    },
    changeLocale(locale) {
      self.appLocale = locale
    },
    setLangMessages(key, val) {
      // self.appLangs.set({ en: { fic: 2 } })
      self.appLangs.set(key, val)
    },
    isLocaleExist(locale) {
      return !!self.langs.get(locale)
    },
  }))

export default rootStore
