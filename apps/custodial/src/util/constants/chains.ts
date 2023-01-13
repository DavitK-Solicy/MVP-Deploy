export interface ChainInfo {
  wsUrl,
  name,
  currency,
}

export const chains: { [key: number]: ChainInfo } = {
  5: {
    // rpcUrl: "https://eth-goerli.g.alchemy.com/v2/fhoMkdYwgRymdjo6RSWu-VDBkf0CCEtC",
    // wsUrl: "wss://goerli-light.eth.linkpool.io/ws",
    wsUrl: "wss://eth-goerli.g.alchemy.com/v2/fhoMkdYwgRymdjo6RSWu-VDBkf0CCEtC",
    name: "Goerli testnet",
    currency: "ETH",
  }
}
