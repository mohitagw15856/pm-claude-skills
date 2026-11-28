# Homebrew formula for the PM Skills command-line tool.
#
#   brew tap mohitagw15856/pm-claude-skills https://github.com/mohitagw15856/pm-claude-skills
#   brew install pm-claude-skills
#
# The url and sha256 are rewritten by scripts/update-formula.mjs after each npm publish.
class PmClaudeSkills < Formula
  desc "Professional agent skills for Claude, ChatGPT, Gemini, Cursor and others"
  homepage "https://github.com/mohitagw15856/pm-claude-skills"
  url "https://registry.npmjs.org/pm-claude-skills/-/pm-claude-skills-84.1.0.tgz"
  sha256 "403e99e870322380c0c30e03de0f96c156b4a2b76691f6dfa7918fd5ebef885e"
  license "MIT"

  depends_on "node"

  def install
    system "npm", "install", *std_npm_args
    bin.install_symlink Dir["#{libexec}/bin/*"]
  end

  test do
    assert_match version.to_s, shell_output("#{bin}/pm-claude-skills --version")
  end
end
