import {useEffect, useState} from 'react'
import './App.css'
import { xumm } from "./store/XummStore";

export default function App() {
    const [account, setAccount] = useState<string | undefined>(undefined);

    useEffect(() => {
        xumm.user.account.then((account: string | undefined) => setAccount(account));
    }, []);

    const connect = async () => {
        await xumm.authorize();
    };
  return (
      <>
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
                      <div
                          className={"mt-3 btn btn-wide"}
                          onClick={connect}>
                          Account ID: {account}
                      </div>
                  )}
              </div>
          </div>
      </>
  )
}
