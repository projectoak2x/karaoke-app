import Image from "next/image";
import { useState } from "react";

function Test() {
        let cb ="2.00";
        let tb ="2.73528"


        let num1 = parseFloat("2.73528");
        let num2 = parseFloat("2.00");
        let result = num2 - num1;
        cb = result.toString()
        
        // format cb
        cb = cb.split('.');
        let hr = cb[0], min = `0.${cb[1]}`;
        cb = `${hr} hours ${(min * 60).toFixed(2)} mins`;

        // format tb
        tb = tb.split('.');
        hr = tb[0];
        min = `0.${tb[1]}`;
        tb = `${hr} hours ${(min * 60).toFixed(2)} mins`;
  return (
    <>
                <div className="kanban-org-label">Credits Available: <span className="kanban-org-details">{cb} (including {tb} wip)</span></div>

      <nav className="container relative mx-auto p-6">
        <div className="flex items-center justify-between">
          <div id="logo" className="logo">
            This is Logo
          </div>
          <div className="flex space-x-6 justify-between">
            <a href="home" >Create Lobby</a>
            <a href="tailwind" >Search Lobby</a>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Test;
