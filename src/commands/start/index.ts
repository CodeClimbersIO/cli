// src/commands/start/index.ts
process.env.APP_CONTEXT = "cli";

import { Args, Command } from "@oclif/core";
// eslint-disable-next-line import/no-unresolved
import { bootstrap } from "server";
import find from "find-process";

// Used https://www.asciiart.eu/image-to-ascii to generate the ASCII art
const WELCOME_MESSAGE = `
Welcome to Code Climbers!

↖↖↖↖↖↖↖↖↖↖↖↖↖↖↖↖↖↖↖←↖↖↖↖↖↖
↖↘↘↘↘↘↘↘↘↘↘↘↓↘↘↘↘↘↘↘↘↘↘↘↘↖         ←↖↖↖                       ↖↖
↖↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↖     ↖↖↖←↘↓↓↓↖↖↖                  ←↖↘↑↓↖
↖↘↘↘↘↖↖↖↖↖↖↖↖↖↖↖↖↖↖↖←↘↘↘↘↖    ↖↖↘↘↘↖  ↖↖↘↘↖  ↖↖↖↖↖←↖    ↖↖↖↖↖↘↘↘↘↖ ↖↖↖↖↖↖↖↘
↖↘↘↘↖↖               ↘↘↘↘↖    ↖↘↘↘↑    ↖↓↘↖ ↖↖↓←↖↖↖↖↖↖↖↖↖↘↘↘↘↘↘↘↘↖↖←↘     ↖↖
↖↘↘↘↖                ↘↘↘↘↖    ↖↘↘↘↑         ↓↘↘↓  ↖↘↘↘↓↘↘↘↘    ↘↘↘↘↘↘↘↘↘↘↘↘↘↖
↓↓↓↖↖←↖↖↖↖↖↖↖↖↖↖↖↖↖↖↓↓↓↓     ↖↖↘↘↑↓↖ ↖↖↘↓↓ ↓↘↘↓ ↖↖↘↘→→→↘↘↘↘   ↘↘↘↘↘↘↘↘↘↘↘↖↘↖
↖↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↖     ←←↘↘↘↘↘↘↘↘↖↖ ↖↖↘↑↑↑↘↘↖↖ ←↓↘↘↘↘↘↘↘↘↘→↘↘↘↘
↖↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘←       ↖↖↖←↖↖↖↖    ↖↖↖↖↖↖↖    ↖↖↖↖↖↖↖↖↖  ↖↖↖↖↖↖↖↖↖
↖↘↘↘↘↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↘↘↘↖
↖↘↘↘↓↖              ↖↘↘↘↘↖         ↖↖←↖     ↖↖↖  ↖↖↖↖                 ↖↖←
↖↗↓↗↓                ↓↗↓↓↖      ←←←↘↘↘↘↖←↖  ↖↘↘→ ↘↘↘←                 ↖↘↓↖
←↘↘↘↖↖↖↖↖↘↘↖ ↖↘↘↘ ↘↓↓↖ ↖↖↖    ↖↖↖↖↖↖↖  ↖↘↓↖ ↖↖↖↖      ↖↖↖↖↖←  ↖↖↖↖←↖↖↖ ↖↖←↖↖↖
↖↗↓↗↓↖↖↖↖↖↖↖↖↖↖↖↖↖↖←↖↓↗↓↓↖    ↖↘↘↘↖    ↖↖↖← ↖↘↓↘ ↘↘↘↘ ↘↘↘↘↘↘↘↘↓↘↓↘↘↖← ↖↘↘↓↘↘↘↘↖↖ ↖↖↘↘↘↘↘↖↖↖↖↘↘↘↘→→↘↘↓↘↘↓↘↘↖↖
↖↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↖    ↖↘↘↘↖         ↖↘↘↘ ↘↘↘↘ ↓↘↘↓ ↓↘↘↘↘ ↓↘↓↖ ↖↘↘↖  ↘↘↘↘↘↘↘↘↓   ↘↘↘↘↘↘↘↘   ←↘↘↘↘
↖↘↘↘↘↖↖←↖↖↖↖↖↖↖↖↖↖↖↖↖↘↘↘↘↖    ↖↖↘↘↖↖  ←↖↖↖↖ ↖↘↘↘ ↘↘↘↘ ↓↘↘↓ ↓↓↘↘↓ ↓↘↓↖ ↖↘↘↖  ↘↘↘↘↘↘↘↘↘↓↘↘↘↘↓↘↘↘↘     ↘↘↘↘↘↘↖↖
↖↘↘↘↘↖               ↘↘↘↘↖     ↖↖↘↘↘↘↘↘↘↓↖↖ ↖↘↘↘ ↘↘↘↘ ↓↘↘↘ ↘↓↘↘↖ ↖↘↓↖ ↖↘↘↖↖↖↓↘↖↖↖↖↓↘↘↘   ↘↓↘↘↘↘↓        ↘↘↖↖
↖↖↖↖↖↖               ↖↖↖↖↖       ←↖↖↖↖↖↖↖   ↖↖↖↖ ↖↖↖↖ ↖↖↖↖ ↖↖↖↖  ↖↖↖↖ ↖↖↖↖↖↖↖↖↖   ↖↖↖↖↖↖↖↖ ↖←↖↖    ↖↖↖↖↖↖↖↖

Code climbers has started and will begin tracking your activity based on the sources you add.
Visit https://codeclimbers.local to configure your sources
`;

export default class Start extends Command {
  static DEFAULT_PORT = String(14_400); // number of minutes in a day times 10
  static args = {
    port: Args.string({
      description: "Custom port to run the server on",
      required: false,
    }),
  };

  static description = "Starts the codeclimbers server on your machine";

  static examples = [`<%= config.bin %> <%= command.id %>`];

  async run(): Promise<void> {
    const { args } = await this.parse(Start);
    const port = args.port || Start.DEFAULT_PORT;
    process.env.PORT = port; // number of minutes in a day times 10

    const [runningInstance] = await find("port", Number(port));

    if (runningInstance) {
      this.error(
        `A server is already running on port ${port} with process id ${runningInstance.pid}`,
      );
    }

    this.log(WELCOME_MESSAGE);
    bootstrap();
  }
}
