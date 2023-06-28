const USER_AGENT_LIST = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.246', // Windows 10-based PC using Edge browser
  'Mozilla/5.0 (X11; CrOS x86_64 8172.45.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.64 Safari/537.36', // Chrome OS-based laptop using Chrome browser (Chromebook)
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/601.3.9 (KHTML, like Gecko) Version/9.0.2 Safari/601.3.9', // Mac OS X-based computer using a Safari browser
  'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.111 Safari/537.36', // Windows 7-based PC using a Chrome browser
  'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:15.0) Gecko/20100101 Firefox/15.0.1', // Linux-based PC using a Firefox browser
  'Mozilla/5.0 (Linux; Android 5.1; AFTS Build/LMY47O) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/41.99900.2250.0242 Safari/537.36', // Amazon Fire TV
  'Mozilla/5.0 (PlayStation; PlayStation 5/2.26) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0 Safari/605.1.15' // Playstation 5
]

const random = Math.round(Math.random() * USER_AGENT_LIST.length)
const clamp = (number: number, max: number): number => Math.min(Math.max(number, 0), max - 1)
export const randomUserAgent = (): string => USER_AGENT_LIST[clamp(random, USER_AGENT_LIST.length)]