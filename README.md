# Arisu

The only Discord bot you'll need. Developed by [tygerxqt](https://github.com/tygerxqt) and [NyanSpaghetti](https://github.com/NyanSpaghetti).

## What's in the box?

This repository is a [monorepo](https://monorepo.tools), which means that all of the different apps and packages are included in one repository.
Arisu uses the [Turborepo](https://turbo.build/repo) engine to help manage this.

The structure of the repo is as follows:

- [/apps](https://github.com/lofustudio/arisu/tree/update/apps): Location of all the TS projects.
- [/packages](https://github.com/lofustudio/arisu/tree/update/packages): Location of all the internal packages used by `/apps`.

- [/apps/bot](https://github.com/lofustudio/arisu/tree/update/apps/bot): A NodeJS application that talks to the Discord API.
- [/apps/dash](https://github.com/lofustudio/arisu/tree/update/dash): A NextJS app which allows you to easily manage settings and configuration.

- [/packages/db](https://github.com/lofustudio/arisu/tree/update/packages/db): A Prisma ORM client.
- [/packages/tsconfig](https://github.com/lofustudio/arisu/tree/update/packages/tsconfig): All of the `tsconfig` files.

## Running Locally

Arisu uses [pnpm](https://pnpm.io/installation) for it's package manager so you'll need to make sure you have it installed.
Additionally, [NodeJS](https://nodejs.org/en) version 16 or higher is required.

Here are some command to help you setup the workspace on your local machine:

```sh
git clone https://github.com/lofustudio/arisu
cd arisu
pnpm install
```

Once you have ran those commands, you should be ready to start development.

Here are another set of useful commands for Turborepo and pnpm:

```sh
# Add a package to a workspace.
# Example: pnpm add discord.js --filter bot
pnpm add <package> --filter <workspace>

# Remove a package from a workspace.
# Example: pnpm remove next --filter dash
pnpm remove <package> --filter <workspace>

# Update all packages in a workspace to their latest version.
# Example: pnpm update --filter db
pnpm update --filter <workspace>

# Start all workspaces in dev mode.
pnpm dev

# Build all workspaces.
pnpm build

# Start all workspaces.
pnpm start
```

## Contact

If additional help is needed, you can contact tygerxqt through email (hi at tygr.dev) or [Tweet](https://twitter.com/intent/tweet?text=@lofustudio) at us.
