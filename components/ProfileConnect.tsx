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
        <button className="font-bold rounded bg-blue-500 text-white" onClick={() => disconnect()}>
          Disconnect
        </button>
        <div>Account:</div>
        <div className="text-xs text-gray-500 w-48">{address}</div>
      </div>
    );
  return (
    <>
      <button className="font-bold rounded bg-blue-500 text-white" onClick={() => connect()}>
        Connect Wallet
      </button>
      <div>Account:</div>
      <div>Not connected yet</div>
    </>
  );
}
