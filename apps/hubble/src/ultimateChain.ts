import { defineChain } from 'viem';

export default defineChain({
  id: 24959,
  name: 'ultimate',
  nativeCurrency: {
    decimals: 18,
    name: 'TEST',
    symbol: 'TEST',
  },
  rpcUrls: {
    default: {
      http: ['https://rpc-ultimate-silver-narwhal-6qksqiedjv.t.conduit.xyz'],
    },
    public: {
      http: ['https://rpc-ultimate-silver-narwhal-6qksqiedjv.t.conduit.xyz'],
    },
  },
  blockExplorers: {
    default: { name: 'Explorer', url: 'https://explorerl2new-ultimate-silver-narwhal-6qksqiedjv.t.conduit.xyz' },
  },
});
