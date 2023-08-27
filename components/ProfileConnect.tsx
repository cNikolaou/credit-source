import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';

export default function ProfileConnect() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();

  if (isConnected)
    return (
      <div>
        <button onClick={() => disconnect()}>{address?.substring(0, 10)}...</button>
      </div>
    );
  return (
    <>
      <button onClick={() => connect()}>Connect Wallet</button>
    </>
  );
}
