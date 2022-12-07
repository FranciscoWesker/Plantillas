/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
       
      },
    }),
     babelTransformerPath: require.resolve('react-native-react-bridge/lib/plugin'),
  },
  rnrb: {
    // Set `true` if you use Preact in web side.
    // This will alias imports from `react` and `react-dom` to `preact/compat` automatically.
    preact: true
  },
};
