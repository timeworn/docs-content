export interface Command {
  /**
   * This is the name of your command. When a user types your command prefix
   * followed by this name, the command will run.
   *
   * **Example:** If command's name is `"hello"`, users will type `!hello` to
   * run it.
   */
  name: string;
  /**
   * A short explanation of what your command does. This helps users understand
   * what the command is for and is often shown in help menus.
   *
   * **Example:** `"Greets the user with a friendly message"`
   */
  description?: string;
  /**
   * <Callout>
   *   When using `aliases` in a [command group](./command-group), the aliases apply
   *   to all commands in that group and its subgroups.
   * </Callout>
   *
   * Alternative names for the command. If you have a command called `"hello"`,
   * you can add aliases like `["hi", "hey"]`. Users can type any of these names
   * to run the same command.
   *
   * **Example:** `aliases: ["hi", "hey", "greet"]` means users can type `!hi`,
   * `!hey`, or `!greet` to run the `"hello"` command.
   */
  aliases?: string[];
  /**
   * <Callout>
   *   When using `cooldown` in a [command group](./command-group), the cooldown
   *   applies to all commands in that group and its subgroups.
   * </Callout>
   *
   * Prevents the command from being used too frequently by the same person. The
   * number is in **seconds**.
   *
   * **Example:** `cooldown: 5` means each person can only use this command
   * once every 5 seconds. This is useful for preventing spam.
   */
  cooldown?: number;
  /**
   * <Callout>
   *   When using `permission` in a [command group](./command-group), the permission
   *   level applies to all commands in that group and its subgroups.
   * </Callout>
   *
   * Controls who is allowed to use the command. You must specify a
   * `PermissionLevel`:
   *
   * - `PermissionLevel.User` - Anyone can use it
   * - `PermissionLevel.Moderator` - Only moderators can use it
   * - `PermissionLevel.Admin` - Only server admins can use it
   * - `PermissionLevel.Owner` - Only the server owner can use it
   * - `PermissionLevel.BotOwner` - Only the bot owner (you) can use it
   *
   * You can modify the permission levels in the `src/classes/command.ts` file.
   *
   * **Example:** `permission: PermissionLevel.User` allows anyone to use the
   * command.
   */
  // @ts-expect-error - not imported
  permission: PermissionLevel;
  /**
   * This is the actual code that runs when someone uses the command. It
   * receives:
   *
   * - `client` - Your bot instance
   * - `message` - The message object that triggered the command
   *
   * **Example:**
   *
   * ```ts
   * execute: (client, message) => {
   *   message.reply("Hello, world!");
   * };
   * ```
   */
  // @ts-expect-error - not imported
  execute: (client: Client, message: Message) => Promise<any> | any;
}

export interface CommandGroup extends Command {
  /**
   * The actual name of the command group comes from your folder name, not this
   * property. This property exists due to the command structure but should
   * always be blank.
   *
   * ```ts
   * // Don't do this:
   * name: "fun";
   * // Do this:
   * name: "";
   * ```
   */
  name: "";
  /**
   * Alternative names for commands in this group. These aliases **nest** with
   * subgroups and commands.
   *
   * **Example:** If you have a group called "fun" with aliases `["funny",
   * "entertainment"]`:
   *
   * - Users can type: `!fun joke`, `!funny joke`, or `!entertainment joke`
   *
   * When you create a subgroup inside "fun" called "image" with aliases
   * `["img"]`:
   *
   * - Users can type any combination:
   *
   *   - `!fun image meme`
   *   - `!fun img meme`
   *   - `!funny image meme`
   *   - `!funny img meme`
   *   - `!entertainment image meme`
   *   - `!entertainment img meme`
   */
  aliases?: Command["aliases"];
  /**
   * A cooldown (in seconds) that applies to **all commands** in this group.
   * Each command inherits this cooldown unless it specifies its own.
   *
   * **Example:**
   *
   * ```ts
   * new Command({
   *   name: "",
   *   cooldown: 5, // All mod commands have a 5 second cooldown by default
   * });
   * ```
   *
   * Individual commands in the `mod` group can override this:
   *
   * ```ts
   * new Command({
   *   name: "kick",
   *   cooldown: 10, // This command has a 10 second cooldown instead of 5
   * });
   * ```
   */
  cooldown?: Command["cooldown"];
  /**
   * A permission level that applies to **all commands** in this group. Each
   * command inherits this permission unless it specifies its own.
   *
   * **Example:**
   *
   * ```ts
   * new Command({
   *   name: "",
   *   permission: PermissionLevel.Moderator, // All mod commands require moderator
   * });
   * ```
   */
  permission: Command["permission"];
}

export interface Event {
  /**
   * The name of the Discord event you want to listen to. This has
   * auto-complete, so your editor will suggest valid event names.
   *
   * **Example:** `name: "messageCreate"`
   */
  // @ts-expect-error - not imported
  name: ClientEvent;
  /**
   * A brief explanation of what this event handler does.
   *
   * **Example:** `"Logs when new members join the server"`
   */
  description?: string;
  /**
   * If set to `true`, this event will only run **once**. If `false` or nothing
   * is provided, it will run every time the event happens.
   *
   * **Example:** `once: true` is useful for the `"ready"` event since you only
   * need to run it once when the bot starts.
   */
  once?: boolean;
  /**
   * The code that runs when the event is triggered. The parameters you receive
   * depend on the event type:
   *
   * - `client` - Your bot instance (always the first parameter)
   * - `...args` - Event-specific data (varies by event)
   *
   * **Example for messageCreate:**
   *
   * ```ts
   * execute: (client, message) => {
   *   console.log(message.author.username + " sent a message");
   * };
   * ```
   *
   * This will log the username of anyone who sends a message in any server your
   * bot is in.
   */
  execute: (
    // @ts-expect-error - not imported
    ...args: [client: Client, ...ClientEvents[T]]
  ) => void | Promise<void>;
}
