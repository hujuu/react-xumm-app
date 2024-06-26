import { useEffect, useState } from 'react';
import { xumm } from "./store/XummStore";
import { Client, AccountInfoRequest } from 'xrpl';
import PaymentForm from "./components/PaymentForm.tsx";

export default function App() {
    const [account, setAccount] = useState<string | undefined>(undefined);
    const [balance, setBalance] = useState<string | undefined>(undefined);

    useEffect(() => {
        xumm.user.account.then((account: string | undefined) => setAccount(account));
    }, []);

    useEffect(() => {
        const fetchBalance = async () => {
            if (account) {
                const client = new Client('wss://testnet.xrpl-labs.com');
                await client.connect();

                const request: AccountInfoRequest = {
                    command: 'account_info',
                    account: account,
                    ledger_index: 'validated'
                };

                const response = await client.request(request);
                setBalance(response.result.account_data.Balance);
                await client.disconnect();
            }
        };

        fetchBalance();
    }, [account]);

    const connect = async () => {
        await xumm.authorize();
    };

    return (
        <div className="relative w-full h-[350px]">
            <div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-lg text-stone-50">
                {!account && (
                    <div className={"h-1/2"}>
                        <div
                            className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                            onClick={connect}>
                            ウォレットを接続してはじめる
                        </div>
                    </div>
                )}
                {account && (
                    <div>
                        <div className={"mt-3 text-gray-800"}>
                            Account ID: {account}
                        </div>
                        <div className={"mt-3 mb-8 text-gray-800"}>
                            {balance !== undefined ? `XRP Balance: ${Number(balance) / 1000000}` : 'Fetching balance...'}
                        </div>
                        <PaymentForm account={account}/>
                    </div>
                )}
            </div>
        </div>
    );
}
