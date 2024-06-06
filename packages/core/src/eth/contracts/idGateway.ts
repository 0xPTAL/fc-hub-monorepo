import { HubAsyncResult, HubError } from "../../errors";
import { ResultAsync } from "neverthrow";
import { verifyTypedData, bytesToHex } from "viem";

export type IdGatewayRegisterMessage = {
  /** FID custody address */
  to: `0x${string}`;

  /** FID recovery address */
  recovery: `0x${string}`;

  /** IdGateway nonce for signer address */
  nonce: bigint;

  /** Unix timestamp when this message expires */
  deadline: bigint;
};

export const ID_GATEWAY_ADDRESS = "0xdae38e1d108405c7a6ce39f36042c9079abcb0eb" as const;

export const ID_GATEWAY_EIP_712_DOMAIN = {
  name: "Farcaster IdGateway",
  version: "1",
  chainId: 10,
  verifyingContract: ID_GATEWAY_ADDRESS,
} as const;

export const ID_GATEWAY_REGISTER_TYPE = [
  { name: "to", type: "address" },
  { name: "recovery", type: "address" },
  { name: "nonce", type: "uint256" },
  { name: "deadline", type: "uint256" },
] as const;

export const ID_GATEWAY_EIP_712_TYPES = {
  domain: ID_GATEWAY_EIP_712_DOMAIN,
  types: { Register: ID_GATEWAY_REGISTER_TYPE },
} as const;

export const verifyRegister = async (
  message: IdGatewayRegisterMessage,
  signature: Uint8Array,
  address: Uint8Array,
): HubAsyncResult<boolean> => {
  const valid = await ResultAsync.fromPromise(
    verifyTypedData({
      address: bytesToHex(address),
      domain: ID_GATEWAY_EIP_712_DOMAIN,
      types: { Register: ID_GATEWAY_REGISTER_TYPE },
      primaryType: "Register",
      message,
      signature,
    }),
    (e) => new HubError("unknown", e as Error),
  );

  return valid;
};
