/* eslint-disable no-template-curly-in-string */

const dateformat = import('dateformat');
const path = require('path');
const util = require('util');
const fs = require('fs');
const readFileAsync = util.promisify(fs.readFile);

// the *.hbs template and partials should be passed as strings of contents
const template = readFileAsync(
  path.join(__dirname, 'build', 'release-notes.hbs'),
);
const commitTemplate = readFileAsync('.build/commit-template.hbs');
let choreMessage = '';
if (process.env.GITHUB_ACTIONS) {
  // CI IS SET
  choreMessage = ':construction_worker: chore(release): ${nextRelease.version}';
} else {
  // CI IS NOT SET
  choreMessage =
    ':construction_worker: chore(release): ${nextRelease.version} [skip ci]';
}

module.exports = {
  release: {
    defaultBranch: 'main',
    branches: [
      '+([0-9])?(.{+([0-9]),x}).x',
      'main',
      'next',
      'next-major',
      {
        name: 'beta',
        prerelease: true,
      },
      {
        name: 'alpha',
        prerelease: true,
      },
    ],
  },
  plugins: [
    [
      'semantic-release-gitmoji',
      {
        // NOTE: These are categorized by the gitmojis.json found here
        // https://raw.githubusercontent.com/carloscuesta/gitmoji/master/packages/gitmojis/src/gitmojis.json
        releaseRules: {
          major: [
            ':boom:', //Introduce breaking changes.
          ],
          minor: [
            ':sparkles:', //Introduce new features.
          ],
          patch: [
            ':zap:', //Improve performance.
            ':bug:', //Fix a bug.
            ':ambulance:', //Critical hotfix.
            ':lipstick:', //Add or update the UI and style files.
            ':lock:', //Fix security or privacy issues.
            ':arrow_down:', //Downgrade dependencies.
            ':arrow_up:', //Upgrade dependencies.
            ':pushpin:', //Pin dependencies to specific versions.
            ':chart_with_upwards_trend:', //Add or update analytics or track code.
            ':heavy_plus_sign:', //Add a dependency.
            ':heavy_minus_sign:', //Remove a dependency.
            ':wrench:', //Add or update configuration files.
            ':globe_with_meridians:', //Internationalization and localization.
            ':pencil2:', //Fix typos.
            ':rewind:', //Revert changes.
            ':package:', //Add or update compiled files or packages.
            ':alien:', //Update code due to external API changes.
            ':bento:', //Add or update assets.
            ':wheelchair:', //Improve accessibility.
            ':speech_balloon:', //Add or update text and literals.
            ':card_file_box:', //Perform database related changes.
            ':children_crossing:', //Improve user experience / usability.
            ':iphone:', //Work on responsive design.
            ':egg:', //Add or update an easter egg.
            ':alembic:', //Perform experiments.
            ':mag:', //Improve SEO.
            ':label:', //Add or update types.
            ':triangular_flag_on_post:', //Add, update, or remove feature flags.
            ':goal_net:', //Catch errors.
            ':dizzy:', //Add or update animations and transitions.
            ':wastebasket:', //Deprecate code that needs to be cleaned up.
            ':passport_control:', //Work on code related to authorization, roles and permissions.
            ':adhesive_bandage:', //Simple fix for a non-critical issue.
            ':necktie:', //Add or update business logic.
          ],
          // LEFT OUT AS THESE ARE N/A
          //':art:', //Improve structure / format of the code.
          //':fire:', //Remove code or files.
          //':memo:', //Add or update documentation.
          //':rocket:', //Deploy stuff.
          //':tada:', //Begin a project.
          //':white_check_mark:', //Add, update, or pass tests.
          //':closed_lock_with_key:', //Add or update secrets.
          //':bookmark:', //Release / Version tags.
          //':rotating_light:', //Fix compiler / linter warnings.
          //':construction:', //Work in progress.
          //':green_heart:', //Fix CI Build.
          //':construction_worker:', //Add or update CI build system.
          //':recycle:', //Refactor code.
          //':hammer:', //Add or update development scripts.
          //':poop:', //Write bad code that needs to be improved.
          //':twisted_rightwards_arrows:', //Merge branches.
          //':truck:', //Move or rename resources (e.g.: files, paths, routes).
          //':page_facing_up:', //Add or update license.
          //':bulb:', //Add or update comments in source code.
          //':beers:', //Write code drunkenly.
          //':loud_sound:', //Add or update logs.
          //':mute:', //Remove logs.
          //':busts_in_silhouette:', //Add or update contributor(s).
          //':building_construction:', //Make architectural changes.
          //':clown_face:', //Mock things.
          //':see_no_evil:', //Add or update a .gitignore file.
          //':camera_flash:', //Add or update snapshots.
          //':seedling:', //Add or update seed files.
          //':monocle_face:', //Data exploration/inspection.
          //':coffin:', //Remove dead code.
          //':test_tube:', //Add a failing test.
          //':stethoscope:', //Add or update healthcheck.
          //':bricks:', //Infrastructure related changes.
          //':technologist:', //Improve developer experience.
          //':money_with_wings:', //Add sponsorships or money related infrastructure.
          //':thread:', //Add or update code related to multithreading or concurrency.
          //':safety_vest:', //Add or update code related to validation.
        },
        releaseNotes: {
          template,
          partials: { commitTemplate },
          helpers: {
            datetime(format = 'UTC:yyyy-mm-dd') {
              return dateformat.dateFormat(new Date(), format);
            },
          },
          issueResolution: {
            template: '{baseUrl}/{owner}/{repo}/issues/{ref}',
            baseUrl: 'https://github.com',
            source: 'github.com',
            removeFromCommit: false,
            regex: /#\d+/g, // example matches: #2341 #8
          },
        },
      },
    ],
    [
      '@semantic-release/changelog',
      {
        changelogFile: 'CHANGELOG.md',
        changelogTitle: '# Changelog',
      },
    ],
    [
      '@semantic-release/npm',
      {
        npmPublish: false,
        tarballDir: 'dist',
      },
    ],
    [
      '@semantic-release/git',
      {
        assets: ['package.json', 'CHANGELOG.md'],
        message: `${choreMessage}\n\n\${nextRelease.notes}`,
        // message: choreMessage,
      },
    ],
    [
      '@semantic-release/github',
      {
        assets: [
          {
            path: 'dist/**',
          },
        ],
      },
    ],
  ],
  extends: ['semantic-release-config-gitmoji'],
};
