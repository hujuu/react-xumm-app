import { xumm } from "../store/XummStore";
import {useState} from "react";

export default function PaymentForm({ account }: { account: string | undefined }) {
    const [destinationAddress, setDestinationAddress] = useState('');
    const [transactionAmount, setTransactionAmount] = useState('');

    const createTransaction = async () => {
        const payload = await xumm.payload?.create({
            TransactionType: "Payment",
            Destination: destinationAddress,
            Amount: String(Number(transactionAmount)*1000000), // 1000 drops (=0.001000XRP)
        });
        if (!payload?.pushed) {
            // XummへPush通知が届かない場合の処理
        }
    };

    return (
        <div>
            {account && (
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
                            name="amount"
                            id="amount"
                            className="block w-1/2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="1000"
                            onChange={(e) => setTransactionAmount(e.target.value)}
                        />
                        <div className="pointer-events-none absolute inset-y-0 right-1/2 flex items-center pr-3">
                                  <span className="text-gray-500 sm:text-sm" id="price-currency">
                                    XRP
                                  </span>
                        </div>
                    </div>
                    <button
                        type="button"
                        className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        onClick={createTransaction}>Payment
                    </button>
                </div>
            )}
        </div>
    );
}
