module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Remove the default CRA SVG loader
      const fileLoaderRule = webpackConfig.module.rules.find((rule) =>
        rule.test?.test?.(".svg")
      );
      if (fileLoaderRule) {
        fileLoaderRule.exclude = /\.svg$/i;
      }

      // Add SVGR loader
      webpackConfig.module.rules.push({
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: [
          {
            loader: "@svgr/webpack",
            options: {
              throwIfNamespace: false,
              svgoConfig: {
                plugins: [
                  {
                    name: "removeXMLNS",
                    active: true,
                  },
                  {
                    name: "removeViewBox",
                    active: false,
                  },
                ],
              },
            },
          },
        ],
      });

      return webpackConfig;
    },
  },
};
