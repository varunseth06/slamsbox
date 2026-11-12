// Publish committed dist/ to the same repository's GitHub Pages source branch.
// Uses the caller's normal Git authentication; no credentials are stored here.
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
process.chdir(fileURLToPath(new URL('..', import.meta.url)));
const run = (command, args) => execFileSync(command, args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'inherit'] }).trim();
run('git', ['diff', '--exit-code', 'HEAD', '--', 'dist']);
console.log(run('npm', ['run', 'check']));
console.log(run('npm', ['test']));
run('git', ['fetch', 'origin', 'gh-pages']);
const parent = run('git', ['rev-parse', 'FETCH_HEAD']);
const tree = run('git', ['rev-parse', 'HEAD:dist']);
if (tree === run('git', ['rev-parse', `${parent}^{tree}`])) {
  console.log('The current site is already published.');
} else {
  const source = run('git', ['rev-parse', '--short', 'HEAD']);
  const commit = run('git', ['commit-tree', tree, '-p', parent, '-m', `Publish Slamsbox from ${source}`]);
  console.log(run('git', ['push', 'origin', `${commit}:refs/heads/gh-pages`]));
  console.log('Published source. GitHub Pages will build the gh-pages branch.');
}
console.log('https://varunseth06.github.io/slamsbox/');
