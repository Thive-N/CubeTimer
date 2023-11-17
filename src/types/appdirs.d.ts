declare module 'appdirs' {
  /**
   * @param {string} appname Application name.
   * @param {string} [appauthor] Application author. Defaults to appname.
   * @param {string} [version] Application version.
   * @param {boolean} [roaming] If true, use directory for roaming profile.
   * @param {boolean} [multipath] If true, return arrays for multipath functions
   *                              (siteDataDir, siteConfigDir).
   * @constructor
   */

  class AppDirs {
    constructor(
      appname: string,
      appauthor?: string,
      version?: string,
      roaming?: boolean,
      multipath?: boolean,
    );

    /**
     * User data directory.
     * @returns {string}
     */
    userDataDir(): string;

    /**
     * User configuration directory.
     * @returns {string}
     */
    userConfigDir(): string;

    /**
     * User cache directory.
     * @returns {string}
     */
    userCacheDir(): string;

    /**
     * Site data directory.
     * @returns {string}
     */
    siteDataDir(): string;

    /**
     * Site configuration directory.
     * @returns {string}
     */
    siteConfigDir(): string;

    /**
     * User log directory.
     * @returns {string}
     */
    userLogDir(): string;
  }
  /**
   * Return full path to the user-specific data dir for this application.
   *
   * Typical user cache directories are:
   * <dl>
   *    <dt>Mac OS X</dt>
   *      <dd>~/Library/Application Support/{AppName}</dd>
   *    <dt>Unix</dt>
   *      <dd>~/.local/share/{AppName}/log</dd>
   *    <dt>Win 7 (not roaming)</dt>
   *      <dd>C:\Users\{username}\AppData\Local\{AppAuthor}\{AppName}</dd>
   *    <dt>Win 7 (roaming)</dt>
   *      <dd>C:\Users\{username}\AppData\Roaming\{AppAuthor}\{AppName}</dd>
   * </dl>
   *
   * @param {string} [appname] Application name. If not give, then the base user
   *    data directory is returned.
   * @param {string} [appauthor] Application author's name. This falls back to
   *    appname.
   * @param {string} [version] Optional version to append to the path. Only
   *    applied when appname is present.
   * @param {boolean} [roaming] When set, use the Windows roaming
   *    appdata directory
   * @returns {string} User data directory.
   * @function
   */
  function userDataDir(
    appname?: string,
    appauthor?: string,
    version?: string,
    roaming?: boolean,
  ): string;
  /**
   * Return full path to the user-specific config dir for this application.
   *
   * Typical user data directories are:
   * <dl>
   *   <dt>Mac OS X</dt>
   *     <dd>same as user_data_dir</dd>
   *   <dt>Unix</dt>
   *     <dd>~/.config/{AppName}</dd>
   *   <dt>Windows</dt>
   *     <dd>same as user_data_dir</dd>
   * </dl>
   *
   * @param {string} [appname] Application name. If not give, then the base user
   *    config directory is returned.
   * @param {string} [appauthor] Application author's name. This falls back to
   *    appname.
   * @param {string} [version] Optional version to append to the path. Only
   *    applied when appname is present.
   * @param {boolean} [roaming] When set, use the Windows roaming
   *    appdata directory
   * @returns {string} User config directory.
   * @function
   */
  function userConfigDir(
    appname?: string,
    appauthor?: string,
    version?: string,
    roaming?: boolean,
  ): string;
  /**
   * Return full path to the user-specific cache dir for this application.
   *
   * Typical user cache directories are:
   * <dl>
   *   <dt>Mac OS X</dt>
   *     <dd>~/Library/Caches/{AppName}</dd>
   *   <dt>Unix</dt>
   *     <dd>~/.cache/{AppName}</dd>
   * </dl>
   *
   * @param {string} [appname] Application name. If not give, then the base user
   *    cache directory is returned.
   * @param {string} [appauthor] Application author's name. This falls back to
   *    appname.
   * @param {string} [version] Optional version to append to the path. Only
   *    applied when appname is present.
   * @returns {string} User cache directory
   * @function
   */
  function userCacheDir(
    appname?: string,
    appauthor?: string,
    version?: string,
  ): string;
  /**
   * Return full path to the user-shared data dir for this application.
   *
   * Typical site data directories are:
   * <dl>
   *   <dt>Mac OS X</dt>
   *     <dd>/Library/Application Support/{AppName}</dd>
   *   <dt>Unix</dt>
   *     <dd>/usr/local/share/{AppName} or /usr/share/{AppName}</dd>
   * </dl>
   *
   * @param {string} [appname] Application name. If not give, then the base site
   *    data directory is returned.
   * @param {string} [appauthor] Application author's name. This falls back to
   *    appname.
   * @param {string} [version] Optional version to append to the path. Only
   *    applied when appname is present.
   * @param {boolean} [multipath] If true, on *NIX, all site data dirs are
   *                              returned.
   * @returns {string} Site data directory.
   * @function
   */
  function siteDataDir(
    appname?: string,
    appauthor?: string,
    version?: string,
    multipath?: boolean,
  ): string;
  /**
   * Return full path to the user-shared config dir for this application.
   *
   * Typical user data directories are:
   * <dl>
   *   <dt>Mac OS X</dt>
   *     <dd>same as site_data_dir</dd>
   *   <dt>Unix</dt>
   *     <dd>/etc/xdg/{AppName}</dd>
   *   <dt>Windows</dt>
   *     <dd>same as site_data_dir</dd>
   * </dl>
   *
   * @param {string} [appname] Application name. If not give, then the base site
   *    data directory is returned.
   * @param {string} [appauthor] Application author's name. This falls back to
   *    appname.
   * @param {string} [version] Optional version to append to the path. Only
   *    applied when appname is present.
   * @param {boolean} [multipath] If true, on *NIX, all site data dirs are
   *                              returned.
   * @returns {string} Site config directory.
   * @function
   */
  function siteConfigDir(
    appname?: string,
    appauthor?: string,
    version?: string,
    multipath?: boolean,
  ): string;
  /**
   * Return full path to the user-specific log dir for this application.
   *
   * Typical user cache directories are:
   * <dl>
   *   <dt>Mac OS X</dt>
   *     <dd>~/Library/Logs/{AppName}</dd>
   *   <dt>Unix</dt>
   *     <dd>~/.cache/{AppName}/log</dd>
   * <dl>
   *
   * @param {string} [appname] Application name. If not give, then the base site
   *    data directory is returned.
   * @param {string} [appauthor] Application author's name. This falls back to
   *    appname.
   * @param {string} [version] Optional version to append to the path. Only
   *    applied when appname is present.
   * @returns {string} User log directory.
   * @function
   */
  function userLogDir(
    appname?: string,
    appauthor?: string,
    version?: string,
  ): string;
}
