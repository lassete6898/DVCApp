// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.0 <0.9.0;

contract EscribirEnLaBlockchain {
    string texto;

    function Escribir(string calldata _texto) public {
        texto = _texto;
    }

    function Leer() public view returns(string memory) {
        return texto;
    }
}
