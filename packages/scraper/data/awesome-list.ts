import type { Repo } from "types"
import { parseOwnerAndRepoFromGithubUrl } from "../src/parser"

export const githubRepoUrls = [
	"https://github.com/vinta/awesome-python",
	"https://github.com/awesome-selfhosted/awesome-selfhosted",
	"https://github.com/avelino/awesome-go",
	"https://github.com/jaywcjlove/awesome-mac",
	"https://github.com/vuejs/awesome-vue",
	"https://github.com/DopplerHQ/awesome-interview-questions",
	"https://github.com/MaximAbramchuck/awesome-interview-questions",
	"https://github.com/MunGell/awesome-for-beginners",
	"https://github.com/josephmisiti/awesome-machine-learning",
	"https://github.com/enaqx/awesome-react",
	"https://github.com/awesomedata/awesome-public-datasets",
	"https://github.com/fffaraz/awesome-cpp",
	"https://github.com/sindresorhus/awesome-nodejs",
	"https://github.com/Solido/awesome-flutter",
	"https://github.com/wasabeef/awesome-android-ui",
	"https://github.com/vsouza/awesome-ios",
	"https://github.com/rust-unofficial/awesome-rust",
	"https://github.com/akullpp/awesome-java",
	"https://github.com/jondot/awesome-react-native",
	"https://github.com/sorrycc/awesome-javascript",
	"https://github.com/alebcay/awesome-shell",
	"https://github.com/ziadoz/awesome-php",
	"https://github.com/veggiemonk/awesome-docker",
	"https://github.com/lukasz-madon/awesome-remote-job",
	"https://github.com/sindresorhus/awesome-electron",
	"https://github.com/viatsko/awesome-vscode",
	"https://github.com/matteocrippa/awesome-swift",
	"https://github.com/sdras/awesome-actions",
	"https://github.com/academic/awesome-datascience",
	"https://github.com/kdeldycke/awesome-falsehood",
	"https://github.com/thangchung/awesome-dotnet-core",
	"https://github.com/tayllan/awesome-algorithms",
	"https://github.com/quozd/awesome-dotnet",
	"https://github.com/matiassingers/awesome-readme",
	"https://github.com/rockerBOO/awesome-neovim",
	"https://github.com/unixorn/awesome-zsh-plugins",
	"https://github.com/ramitsurana/awesome-kubernetes",
	"https://github.com/agarrharr/awesome-cli-apps",
	"https://github.com/chentsulin/awesome-graphql",
	"https://github.com/vitejs/awesome-vite",
	"https://github.com/markets/awesome-ruby",
	"https://github.com/thibmaek/awesome-raspberry-pi",
	"https://github.com/aniftyco/awesome-tailwindcss",
	"https://github.com/mfornos/awesome-microservices",
	"https://github.com/neutraltone/awesome-stock-resources",
	"https://github.com/terkelg/awesome-creative-coding",
	"https://github.com/h4cc/awesome-elixir",
	"https://github.com/lnishan/awesome-competitive-programming",
	"https://github.com/chiraggude/awesome-laravel",
	"https://github.com/sbilly/awesome-security",
	"https://github.com/KotlinBy/awesome-kotlin",
	"https://github.com/owainlewis/awesome-artificial-intelligence",
	"https://github.com/unicodeveloper/awesome-nextjs",
	"https://github.com/dhamaniasad/awesome-postgres",
	"https://github.com/apsdehal/awesome-ctf",
	"https://github.com/PatrickJS/awesome-angular",
	"https://github.com/AdrienTorris/awesome-blazor",
	"https://github.com/rossant/awesome-math",
	"https://github.com/emacs-tw/awesome-emacs",
	"https://github.com/paralax/awesome-honeypots",
	"https://github.com/mjhea0/awesome-fastapi",
	"https://github.com/troxler/awesome-css-frameworks",
	"https://github.com/meirwah/awesome-incident-response",
	"https://github.com/godotengine/awesome-godot",
	"https://github.com/igorbarinov/awesome-data-engineering",
	"https://github.com/paragonie/awesome-appsec",
	"https://github.com/JanVanRyswyck/awesome-talks",
	"https://github.com/ChromeDevTools/awesome-chrome-devtools",
	"https://github.com/rust-embedded/awesome-embedded-rust",
	"https://github.com/frenck/awesome-home-assistant",
	"https://github.com/sobolevn/awesome-cryptography",
	"https://github.com/steven2358/awesome-generative-ai",
	"https://github.com/shuaibiyy/awesome-terraform",
	"https://github.com/JoseDeFreitas/awesome-youtubers",
	"https://github.com/liuchong/awesome-roadmaps",
	"https://github.com/micromata/awesome-javascript-learning"
]

export const githubAwesomeList: Repo[] = [
	{ owner: "tauri-apps", name: "awesome-tauri" },
	{ owner: "vuejs", name: "awesome-vue" },
	{ owner: "sindresorhus", name: "awesome" },
	{ owner: "rust-unofficial", name: "awesome-rust" },
	{ owner: "rust-unofficial", name: "awesome-rust" },
	...(githubRepoUrls.map(parseOwnerAndRepoFromGithubUrl).filter((r) => r) as Repo[])
]
