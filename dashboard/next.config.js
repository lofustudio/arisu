module.exports = {
    distDir: './build'
}

const nextConfig = {
    webpack: (config, options) => {
        // modify the `config` here

        if (options.isServer) {
            config.externals = ["react", ...config.externals];
        }
        config.resolve.alias["react"] = path.resolve(__dirname, ".\\node_modules\\react");

        return config;
    },
};