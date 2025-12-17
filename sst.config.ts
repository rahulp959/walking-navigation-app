/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "walking-app",
      // removal: input?.stage === "production" ? "retain" : "remove",
      // protect: ["production"].includes(input?.stage),
      home: "aws",
    };
  },
  async run() {
    const vpc = new sst.aws.Vpc("walking-app-vpc");

    const bucket = new sst.aws.Bucket("walking-app-bucket", {
      access: "public",
    });

    const cluster = new sst.aws.Cluster("walking-app-cluster", { vpc });

    new sst.aws.Service("walking-app-service", {
      cluster,
      link: [bucket],
      loadBalancer: {
        ports: [{ listen: "80/http", forward: "3000/http" }],
      },
      dev: {
        command: "pnpm run dev",
      },
    });
  },
});
