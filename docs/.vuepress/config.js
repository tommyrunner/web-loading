module.exports = {
  title: "WebLoading",
  themeConfig: {
    nav: [
      { text: "Home", link: "/" },
      { text: "文档", link: "/test/" },
      { text: "Guide", link: "/guide/" },
    ],
    sidebar: [
      {
        title: "Home",
        collapsable: false,
        children: ["/"],
      },
      {
        title: "自定义",
        children: [
          /* ... */
        ],
      },
    ],
  },
};
