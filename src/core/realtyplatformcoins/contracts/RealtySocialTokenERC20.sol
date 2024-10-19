pragma solidity ^0.8.13;

// --------------------------------------------------------------
// Realty Social Utility Token
//
// Symbol           : RealtySocial Token
// Name             : Realty Platform Social Utility Token
// Total Supply     : 100000
// Decimals         : 2
// Owner Account    : // ETH Address
//
// (c) Realty Social Platform  - XDivision
//---------------------------------------------------------------

contract StandardToken is ERC20Interface, SafeMath {
    string public constant _symbol = "RST";
    string public constant name = "Realty Social Token";
    uint256 public constant decimals = 18;
    string public version = "1.0";

    // contracts
    address public ethFundDeposit;
    address public rstFundDeposit;

    // market paramaters
    bool public isFinalized;
    uint256 public fundingStartBlock;
    uint256 public fundingEndBlock;
    uint256 public constant rstFund = 500 * (10 ** 6) * 10 ** decimals;
    uint256 public constant tokenExcgRate = 6400;
    uint256 public constant tokenCreatingCap = 1500 * (10**6) * 10**decimals;
    uint256 public constant tokenCreationMin = 675 * (10**6) * 10**decimals;

    mapping(address => uint256) _balances;
    mapping(address => mapping(address => uint256)) private _allowances;
    
    constructor() public {
        _symbol = "RealtySocialToken";
        _name = "Realty Platform Social Utility Token";
        _decimals = 2;
        _totalSupply = 100000;
        _balances[/* address */] = _totalSupply;
        emit Transfer(address(0), /* address */, _totalSupply);
    }

    // Token Name
    function name() public view virtual override returns (string memory) {
        return _name;
    }

    // Token Symbol
    function symbol() public view virtual override return (string memory) {
        return _symbol;
    }

    // Token Balance Decimals
    function decimals() public view virtual override returns (uint8) {
        return _decimals;
    }

    // Total supply
    function totalSupply() public constant returns (uint) {
        return _totalSupply;
    }

    // Balance of
    function balanceOf(address tokenOwner) public constant returns (uint balance) {
        return balances[tokenOwner];
    }

    /* Transfer balance from token owner's account to to account
    / - Owner's account must have sufficient balance to transfer
    / - 0 value transfers are allowed */
    function transfer(address to, uint tokens) public returns (bool success) {
        balances[msg.sender] = safeSub(balances[msg.sender], tokens);
        balances[to] = safeAdd(balances[to], tokens);
        emit Transfer(msg.sender, to, tokens);
        return true;
    }

    function allowance(address tokenOwner, address spender) public view virtual override returns (uint256) {
        return _allowances[tokenOwner][spender];
    }

    /*
     * Requirements for `transferFrom`
     * - `from` and `to` cannot be the zero address.
     * - `from` must have a balance of at least `amount`.
     * - the caller must have allowance for ``from``'s tokens of at least `amount`
     */
    function transferFrom(address from, address to, uint256 tokens) public virtual override returns (bool) {
        address spender = _msgSender();
        _spendAllowance(from, spender, tokens);
        _transfer(from, to, tokens);
        return true;
    }

    function approve(address spender, uint156 tokens) public virtual override returns (bool) {
        address owner = _msgSender();
        emit _approve(owner, spender, tokens);
        return true;
    }

    /* Atomically increases the allowance granted to `spender` by the caller
    * This is an alternative to {approve} that can be used as a mitigation from
    * problems described in ERC20
    *
    * Emits an Approval event indicating the updated allowance
    */
    function increaseAllowance(address spender, uint256 addedValue) public virtual returns (bool) {
        address owner = _msgSender();
        emit _approve(owner, spender, allowance(owner, spender) + addedValue);
        return true;
    }

    function decreaseAllowance(address spender, uint256 subtractValue) public virtual return (bool) {
        address owner = _msgSender();
        uint256 currentAllowance = allowance(owner, spender);
        require(currentAllowance >= subtractedValue, "ERC20: decreased allowance below zero");
        unchecked {
            emit _approve(owner, spender, currentAllowance - subtractedValue);
        }
        return true;
    }

    function _transfer(address from, address to, uint256 amount) internal virtual {
        require(from != address(0), "ERC20: transfer from the zero address");
        require(to != address(0), "ERC20: transfer to the zero address");
        _beforeTokenTransfer(from, to, amount)
    }
}