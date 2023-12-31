"use strict";
// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });

//creating class bank acount
class BankAccount {
  constructor(accountNumber, owner) {
    this.accountNumber = accountNumber;
    this.owner = owner;
    this.transaction = [];
  }

  balance() {
    let sum = 0;
    for (let i = 0; i < this.transaction.length; i++) {
      sum += this.transaction[i].amount;
    }
    return sum;
  }
  charge(payee, amt) {
    let chargeTransaction = new Transaction(-1 * amt, payee);
    let currentBalance = this.balance();
    if (amt <= currentBalance) {
      this.transaction.push(chargeTransaction);
    }
  }

  deposit(amt) {
    let depositTransaction = new Transaction(amt, "Deposit");
    this.transaction.push(depositTransaction);
  }
}

class Transaction {
  constructor(amount, payee) {
    this.amount = amount;
    this.payee = payee;
    this.date = new Date();
  }
}

//TESTS

if (typeof describe === "function") {
  const assert = require("assert");

  describe("#testing account creation", function () {
    it("should create a new account correctly", function () {
      let acct1 = new BankAccount("xx4342", "James Doe");
      assert.equal(acct1.owner, "James Doe");
      assert.equal(acct1.accountNumber, "xx4342");
      assert.equal(acct1.transaction.length, 0);
    });
  });

  describe("#Testing transaction creation", function () {
    it("Should create a transaction correctly for a deposit", function () {
      let t1 = new Transaction(30, "Deposit");
      assert.equal(t1.amount, 30);
      assert.equal(t1.payee, "Deposit");
      assert.notEqual(t1.date, undefined);
      assert.notEqual(t1.date, null);
    });
    it("Should create a transaction correctly for a charge", function () {
      let t1 = new Transaction(-34.45, "Target");
      assert.equal(t1.amount, -34.45);
      assert.equal(t1.payee, "Target");
      assert.notEqual(t1.date, undefined);
      assert.notEqual(t1.date, null);
    });
  });

  describe("#Testing account balance", function () {
    it("should create a new account correctly", function () {
      let acct1 = new BankAccount("xx4342", "James Doe");

      assert.equal(acct1.balance(), 0);

      acct1.deposit(100);
      assert.equal(acct1.balance(), 100);

      acct1.charge("Target", 10);
      assert.equal(acct1.balance(), 90);
    });
  });
}
