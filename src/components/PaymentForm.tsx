import { xumm } from "../store/XummStore";

export default function PaymentForm({ account }: { account: string | undefined }) {
    const createTransaction = async () => {
        const payload = await xumm.payload?.create({
            TransactionType: "Payment",
            Destination: "r4aNu6fs5HuS6vBrHrTbNQhp2QbsX9qPSw",
            Amount: "1000", // 1000 drops (=0.001000XRP)
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
                            <span className="bg-white pr-3 text-base font-semibold leading-6 text-gray-900">XRPの送金</span>
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
