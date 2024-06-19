import { useEffect, useState } from 'react';
import './App.css';
import { xumm } from "./store/XummStore";
import { Client, AccountInfoRequest } from 'xrpl';

export default function App() {
    const [account, setAccount] = useState<string | undefined>(undefined);
    const [balance, setBalance] = useState<string | undefined>(undefined);
    const [destinationAddress, setDestinationAddress] = useState('');

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

    const createTransaction = async () => {
        const payload = await xumm.payload?.create({
            TransactionType: "Payment",
            Destination: destinationAddress,
            Amount: "1000", // 1000 drops (=0.001000XRP)
        });
        if (!payload?.pushed) {
            // XummへPush通知が届かない場合の処理
        }
    };

    return (
        <div className="relative w-full h-[350px]">
            <div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-lg text-stone-50">
                {!account && (
                    <div
                        className={"mt-3 btn btn-wide"}
                        onClick={connect}>
                        ウォレットを接続してはじめる
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
                        <div>
                            <div className="relative mb-4">
                                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                    <div className="w-full border-t border-gray-300"/>
                                </div>
                                <div className="relative flex justify-start">
                                    <span
                                        className="bg-white pr-3 text-base font-semibold leading-6 text-gray-900">XRPの送金</span>
                                </div>
                            </div>
                            <div className="relative mb-4">
                                <label
                                    htmlFor="name"
                                    className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900"
                                >
                                    送金先アドレス
                                </label>
                                <input
                                    type="text"
                                    name="wallet-address"
                                    id="wallet-address"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    placeholder=""
                                    onChange={(e) => setDestinationAddress(e.target.value)}
                                />
                            </div>
                            <div className="relative mb-4">
                                <label
                                    htmlFor="name"
                                    className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900"
                                >
                                    送金額
                                </label>
                                <input
                                    type="text"
                                    name="price"
                                    id="price"
                                    className="block w-1/2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    placeholder=""
                                />
                            </div>
                            <button
                                type="button"
                                className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                onClick={createTransaction}>Payment
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
