var web3;
web3 = new Web3(Web3.givenProvider);
var nfyToken;
var LPTokens;
var accounts;
var nfyStaking;
var nfyStakingNFT;
var lpStaking;
var lpStakingNFT;

var wEth;

var nfyStakingV1;
var lpStakingV1;

var tradingPlatform;

var rewardPoolAddress = '0x2Fd782438A622f3f96395f256F70A0546995fd50';
var lpAddress = '0xaddE7da7223669e83CE590af6433842587A31636';
var lpStakingAddress = '0xDCEC14Aa162EE0A0B56f7507Dc26a573C7739f8E';
var nfyStakingAddress = '0x28b9a0E7365b3cB5D5A821b0cAf0f3eAf54b00f4';
var tradingPlatformAddress = '0xA1323eAb60e7a9F89fFeBA846dF5A1da34AB4C9b';
var nfyAddress = '0xBC2fF2a5C7C9A034D434450cb23De20bF2a0ab9C';
var nfyStakingV1Address = '0x28b9a0E7365b3cB5D5A821b0cAf0f3eAf54b00f4';
var lpStakingV1Address = '0xDCEC14Aa162EE0A0B56f7507Dc26a573C7739f8E';
var nfyStakingNFTAddress = '0x30Ec021ab62bc14f88d182CCfe24Da642C917AAA';
var lpStakingNFTAddress = '0x320f0005364E755136cB72955fdc842F18E21ae7';
var wEthAddress = '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd';

var maxAllowance = 1157920892373161954235709850086879078532699846656405;

$(document).ready(async function () {
  connect();

  $('.connect_button').click(connect);
  $('#stake-nfy').click(stakeNfy);
  $('#unstake-nfy').click(unstakeNfy);
  $('#claim-nfy').click(claimNfyRewards);
  $('#compound-nfy').click(compoundNfyRewards);
  $('#submit-lp-stake').click(stakeLp);
  $('#claim-lp-rewards').click(claimLpRewards);

  $('#unstake-nfy-v1').click(unstakeNFYV1);
  $('#unstake-lp-v1').click(unstakeLPV1);

  $('#deposit-button').click(deposit);

  $('#withdraw-button').click(withdraw);

  $('#btn-buy-nfy').click(nfyBuyOrder);
  $('#btn-sell-nfy').click(nfySellOrder);

  $('#btn-buy-nfylp').click(nfyLPBuyOrder);
  $('#btn-sell-nfylp').click(nfyLPSellOrder);

  $('#cancel-nfy-sell').click(cancelNfySellOrder);
  $('#cancel-nfy-buy').click(cancelNfyBuyOrder);
  $('#cancel-nfylp-sell').click(cancelNfyLPSellOrder);
  $('#cancel-nfylp-buy').click(cancelNfyLPBuyOrder);
});

function trim(number, precision) {
  var array = number.toString().split('.');
  array.push(array.pop().substring(0, precision));
  var trimmedNumber = array.join('.');
  return trimmedNumber;
}

function nfyInRewardPool() {
  nfyToken.methods
    .balanceOf(rewardPoolAddress)
    .call()
    .then(function (res) {
      res = res / 1000000000000000000;

      $('#nfy-reward-pool').text(res.toFixed(2));
    });
}

function start(){
  nfyToken.methods
    .allowance(accounts[0], nfyStakingAddress)
    .call()
    .then(function (res) {
      if (res == 0) {
        //Approve
      $('#stake-nfy').val('Approve');
        
      } else {
        //STAKE NFYB
      $('#stake-nfy').val('STAKE NFYB');

      }
    });
}
function startlp(){
  LPTokens.methods
    .allowance(accounts[0], lpStakingAddress)
    .call()
    .then(function (res) {
      if (res == 0) {
        $('#submit-lp-stake').val('Approve');
      } else {
        $('#submit-lp-stake').val('STAKE NFYB/BNB LP');
      }
    });
}
function stakeNfy() {
  nfyToken.methods
    .allowance(accounts[0], nfyStakingAddress)
    .call()
    .then(function (res) {
      if (res == 0) {
        nfyToken.methods
          .approve(nfyStakingAddress, BigInt(maxAllowance).toString())
          .send()

          .on('transactionHash', function (hash) {
            console.log(hash);
          })

          .on('confirmation', function (confirmationNr) {
            console.log(confirmationNr);
          })

          .on('receipt', function (receipt) {
            start();
            console.log(receipt);
          });
      } else {
        var stakeVal = $('#input-nfy-stake').val();

        var stake = web3.utils.toWei(stakeVal, 'ether');

        nfyStaking.methods
          .stakeNFY(stake)
          .send()

          .on('transactionHash', function (hash) {
            console.log(hash);
          })

          .on('confirmation', function (confirmationNr) {
            console.log(confirmationNr);
          })

          .on('receipt', function (receipt) {
            console.log(receipt);
          });
      }
    });
}

function unstakeNfy() {
  nfyStaking.methods
    .unstakeAll()
    .send()

    .on('transactionHash', function (hash) {
      console.log(hash);
    })

    .on('confirmation', function (confirmationNr) {
      console.log(confirmationNr);
    })

    .on('receipt', function (receipt) {
      console.log(receipt);
    });
}

function compoundNfyRewards() {
  nfyStaking.methods
    .compoundAllRewards()
    .send()

    .on('transactionHash', function (hash) {
      console.log(hash);
    })

    .on('confirmation', function (confirmationNr) {
      console.log(confirmationNr);
    })

    .on('receipt', function (receipt) {
      console.log(receipt);
    });
}

function claimNfyRewards() {
  nfyStaking.methods
    .claimAllRewards()
    .send()

    .on('transactionHash', function (hash) {
      console.log(hash);
    })

    .on('confirmation', function (confirmationNr) {
      console.log(confirmationNr);
    })

    .on('receipt', function (receipt) {
      console.log(receipt);
    });
}

function getNfyBalance() {
  // Get NFY balance
  nfyToken.methods
    .balanceOf(accounts[0])
    .call()
    .then(function (res) {
      res = res / 1000000000000000000;

      //$(".nfy-balance").text(res.toFixed(4));
      $('.nfy-balance').text(trim(res, 4));
    });
}

function getTotalNfyStaked() {
  nfyStaking.methods
    .totalStaked()
    .call()
    .then(function (res) {
      res = res / 1000000000000000000;

      $('#total-nfy-staked').text(res.toFixed(4) + ' NFY');
    });
}

function getUserStakedNfy() {
  nfyStaking.methods
    .getTotalBalance(accounts[0])
    .call()
    .then(function (res) {
      res = res / 1000000000000000000;

      $('.nfy-staked').text(res.toFixed(4));
    });
}

function getUserNfyNfts() {
  nfyStakingNFT.methods
    .balanceOf(accounts[0])
    .call()
    .then(function (res) {
      $('#total-nfy-nfts').text(res);
    });
}

function getNfyAPY() {
  var rewardPerBlock;
  nfyStaking.methods
    .getRewardPerBlock()
    .call()
    .then(function (rpb) {
      rewardPerBlock = rpb;
    });

  nfyStaking.methods
    .totalStaked()
    .call()
    .then(function (staked) {
      if (staked == 0) {
        $('#nfy-apy').text('0' + '%');
      } else {
        var apy = (rewardPerBlock * 6500 * 366 * 100) / staked;
        $('#nfy-apy').text(apy.toFixed(2) + '%');
      }
    });
}

function getUserNfyRewards() {
  nfyStaking.methods
    .getTotalRewards(accounts[0])
    .call()
    .then(function (res) {
      res = res / 1000000000000000000;

      $('.nfy-rewards').text(res.toFixed(4) + ' NFY');
    });
}

function stakeLp() {
  LPTokens.methods
    .allowance(accounts[0], lpStakingAddress)
    .call()
    .then(function (res) {
      if (res == 0) {
        LPTokens.methods
          .approve(lpStakingAddress, BigInt(maxAllowance).toString())
          .send()

          .on('transactionHash', function (hash) {
            console.log(hash);
          })

          .on('confirmation', function (confirmationNr) {
            console.log(confirmationNr);
          })

          .on('receipt', function (receipt) {
            startlp();
            console.log(receipt);
          });
      } else {
        var stakeVal = $('#input-lp-stake').val();

        var stake = web3.utils.toWei(stakeVal, 'ether');

        lpStaking.methods
          .stakeLP(stake)
          .send()

          .on('transactionHash', function (hash) {
            console.log(hash);
          })

          .on('confirmation', function (confirmationNr) {
            console.log(confirmationNr);
          })

          .on('receipt', function (receipt) {
            console.log(receipt);
          });
      }
    });
}

function claimLpRewards() {
  lpStaking.methods
    .claimAllRewards()
    .send()

    .on('transactionHash', function (hash) {
      console.log(hash);
    })

    .on('confirmation', function (confirmationNr) {
      console.log(confirmationNr);
    })

    .on('receipt', function (receipt) {
      console.log(receipt);
    });
}

function getTotalLpStaked() {
  lpStaking.methods
    .totalStaked()
    .call()
    .then(function (res) {
      res = res / 1000000000000000000;

      $('#total-lp-staked').text(res.toFixed(4) + ' NFY/ETH LP');
    });
}

function getUserStakedLp() {
  lpStaking.methods
    .getTotalBalance(accounts[0])
    .call()
    .then(function (res) {
      res = res / 1000000000000000000;

      $('.lp-staked').text(res.toFixed(4));
    });
}

function getUserLpNfts() {
  lpStakingNFT.methods
    .balanceOf(accounts[0])
    .call()
    .then(function (res) {
      $('#total-lp-nfts').text(res);
    });
}

function getLpAPY() {
  var rewardPerBlock;
  var nfyInLP;
  var totalLP;

  lpStaking.methods
    .getRewardPerBlock()
    .call()
    .then(function (rpb) {
      rewardPerBlock = rpb;
    });

  nfyToken.methods
    .balanceOf(lpAddress)
    .call()
    .then(function (totalNfy) {
      nfyInLP = totalNfy;
    });

  LPTokens.methods
    .totalSupply()
    .call()
    .then(function (lpTotal) {
      totalLP = lpTotal;
    });

  lpStaking.methods
    .totalStaked()
    .call()
    .then(function (staked) {
      if (staked == 0) {
        $('#lp-apy').text('0' + '%');
      } else {
        var apy =
          (rewardPerBlock * 6500 * 366 * 100) /
          (((staked * nfyInLP) / totalLP) * 2);
        $('#lp-apy').text(apy.toFixed(2) + '%');
      }
    });
}

function getUserLpRewards() {
  lpStaking.methods
    .getTotalRewards(accounts[0])
    .call()
    .then(function (res) {
      res = res / 1000000000000000000;

      $('#lp-rewards').text(res.toFixed(4) + ' NFY');
    });
}

function getLPBalance() {
  // Get NFY balance
  LPTokens.methods
    .balanceOf(accounts[0])
    .call()
    .then(function (res) {
      res = res / 1000000000000000000;

      //$("#lp-balance").text(res.toFixed(4));
      $('#lp-balance').text(trim(res, 4));
    });
}

// Unstake NFY from V1 contract
function unstakeNFYV1() {
  nfyStakingV1.methods
    .unstakeAll()
    .send()

    .on('transactionHash', function (hash) {
      console.log(hash);
    })

    .on('confirmation', function (confirmationNr) {
      console.log(confirmationNr);
    })

    .on('receipt', function (receipt) {
      console.log(receipt);
    });
}

// Unstake LP from v1 Contract
function unstakeLPV1() {
  lpStakingV1.methods
    .unstakeAll()
    .send()

    .on('transactionHash', function (hash) {
      console.log(hash);
    })

    .on('confirmation', function (confirmationNr) {
      console.log(confirmationNr);
    })

    .on('receipt', function (receipt) {
      console.log(receipt);
    });
}

function checkIfV1LPUnstaked() {
  lpStakingV1.methods
    .getTotalBalance(accounts[0])
    .call()
    .then(function (res) {
      res = res / 1000000000000000000;

      if (res == 0) {
        document.getElementById('unstake-lp-v1').disabled = true;
        document.getElementById('unstake-lp-v1').value = 'NO LP STAKED IN V1';
      }
    });
}

function checkIfV1NFYUnstaked() {
  nfyStakingV1.methods
    .getTotalBalance(accounts[0])
    .call()
    .then(function (res) {
      res = res / 1000000000000000000;

      if (res == 0) {
        document.getElementById('unstake-nfy-v1').disabled = true;
        document.getElementById('unstake-nfy-v1').value = 'NO NFY STAKED IN V1';
      }
    });
}

// Trading Platform Functions

// NFY stake sell order
function nfySellOrder() {
  if ($('#price-sell-nfy').val() <= 0) {
    alert('Price can not be less than 0!');
    return;
  }

  nfyToken.methods
    .allowance(accounts[0], tradingPlatformAddress)
    .call()
    .then(function (res) {
      if (res == 0) {
        nfyToken.methods
          .approve(tradingPlatformAddress, BigInt(maxAllowance).toString())
          .send()

          .on('transactionHash', function (hash) {
            console.log(hash);
          })

          .on('confirmation', function (confirmationNr) {
            console.log(confirmationNr);
          })

          .on('receipt', function (receipt) {
            console.log(receipt);
          });
      } else {
        var nfyToSellVal = $('#quantity-sell-nfy').val();
        var nfyPriceVal = $('#price-sell-nfy').val();

        var nfyToSell = web3.utils.toWei(nfyToSellVal, 'ether');
        var nfyPrice = web3.utils.toWei(nfyPriceVal, 'ether');

        tradingPlatform.methods
          .createLimitOrder('nfy', nfyToSell, nfyPrice, 1)
          .send()

          .on('transactionHash', function (hash) {
            console.log(hash);
          })

          .on('confirmation', function (confirmationNr) {
            console.log(confirmationNr);
          })

          .on('receipt', function (receipt) {
            console.log(receipt);
          });
      }
    });
}

// NFY stake buy order
function nfyBuyOrder() {
  if ($('#price-buy-nfy').val() <= 0) {
    alert('Price needs to be more than 0!');
    return;
  }

  nfyToken.methods
    .allowance(accounts[0], tradingPlatformAddress)
    .call()
    .then(function (res) {
      if (res == 0) {
        nfyToken.methods
          .approve(tradingPlatformAddress, BigInt(maxAllowance).toString())
          .send()

          .on('transactionHash', function (hash) {
            console.log(hash);
          })

          .on('confirmation', function (confirmationNr) {
            console.log(confirmationNr);
          })

          .on('receipt', function (receipt) {
            console.log(receipt);
          });
      } else {
        var nfyToBuyVal = $('#quantity-buy-nfy').val();
        var nfyPriceVal = $('#price-buy-nfy').val();

        var nfyToBuy = web3.utils.toWei(nfyToBuyVal, 'ether');
        var nfyPrice = web3.utils.toWei(nfyPriceVal, 'ether');

        tradingPlatform.methods
          .createLimitOrder('nfy', nfyToBuy, nfyPrice, 0)
          .send()

          .on('transactionHash', function (hash) {
            console.log(hash);
          })

          .on('confirmation', function (confirmationNr) {
            console.log(confirmationNr);
          })

          .on('receipt', function (receipt) {
            console.log(receipt);
          });
      }
    });
}

// NFY/ETH LP stake sell order
function nfyLPSellOrder() {
  if ($('#price-sell-lp').val() <= 0) {
    alert('Price can not be less than 0!');
    return;
  }

  nfyToken.methods
    .allowance(accounts[0], tradingPlatformAddress)
    .call()
    .then(function (res) {
      if (res == 0) {
        nfyToken.methods
          .approve(tradingPlatformAddress, BigInt(maxAllowance).toString())
          .send()

          .on('transactionHash', function (hash) {
            console.log(hash);
          })

          .on('confirmation', function (confirmationNr) {
            console.log(confirmationNr);
          })

          .on('receipt', function (receipt) {
            console.log(receipt);
          });
      } else {
        var lpToSellVal = $('#quantity-sell-lp').val();
        var lpPriceVal = $('#price-sell-lp').val();

        var lpToSell = web3.utils.toWei(lpToSellVal, 'ether');
        var lpPrice = web3.utils.toWei(lpPriceVal, 'ether');

        tradingPlatform.methods
          .createLimitOrder('nfylp', lpToSell, lpPrice, 1)
          .send()

          .on('transactionHash', function (hash) {
            console.log(hash);
          })

          .on('confirmation', function (confirmationNr) {
            console.log(confirmationNr);
          })

          .on('receipt', function (receipt) {
            console.log(receipt);
          });
      }
    });
}

// NFY/ETH LP stake buy order
function nfyLPBuyOrder() {
  if ($('#price-buy-lp').val() <= 0) {
    alert('Price needs to be more than 0!');
    return;
  }

  nfyToken.methods
    .allowance(accounts[0], tradingPlatformAddress)
    .call()
    .then(function (res) {
      if (res == 0) {
        nfyToken.methods
          .approve(tradingPlatformAddress, BigInt(maxAllowance).toString())
          .send()

          .on('transactionHash', function (hash) {
            console.log(hash);
          })

          .on('confirmation', function (confirmationNr) {
            console.log(confirmationNr);
          })

          .on('receipt', function (receipt) {
            console.log(receipt);
          });
      } else {
        var lpToBuyVal = $('#quantity-buy-lp').val();
        var lpPriceVal = $('#price-buy-lp').val();

        var lpToBuy = web3.utils.toWei(lpToBuyVal, 'ether');
        var lpPrice = web3.utils.toWei(lpPriceVal, 'ether');

        tradingPlatform.methods
          .createLimitOrder('nfylp', lpToBuy, lpPrice, 0)
          .send()

          .on('transactionHash', function (hash) {
            console.log(hash);
          })

          .on('confirmation', function (confirmationNr) {
            console.log(confirmationNr);
          })

          .on('receipt', function (receipt) {
            console.log(receipt);
          });
      }
    });
}

// Function that will allow users to deposit
function deposit() {
  var assetSelected;
  var depositAmount;
  var idSelected;

  assetSelected = $('#deposit-asset-select').find(':selected').val();
  depositAmount = $('#input-deposit-amount').val();

  //idSelected = $("#deposit-scrollbox ul").children().eq(0).text();
  //idSelected = $("#deposit-scrollbox ul").hasClass("scroll-item-selected").children.eq(0).text();

  $('#mCSB_5_container ul').each(function () {
    if ($(this).hasClass('scroll-item-selected')) {
      var id = $(this).children().eq(0).text();
      idSelected = id.substr(4);
    }
  });

  if (assetSelected == 'eth') {
    var config = { value: web3.utils.toWei(depositAmount, 'ether') };

    tradingPlatform.methods
      .depositEth()
      .send(config)

      .on('transactionHash', function (hash) {
        console.log(hash);
      })

      .on('confirmation', function (confirmationNr) {
        console.log(confirmationNr);
      })

      .on('receipt', function (receipt) {
        console.log(receipt);
      });
  } else {
    depositAmount = web3.utils.toWei(depositAmount, 'ether');
    tradingPlatform.methods
      .depositStake(assetSelected, idSelected, depositAmount)
      .send()

      .on('transactionHash', function (hash) {
        console.log(hash);
      })

      .on('confirmation', function (confirmationNr) {
        console.log(confirmationNr);
      })

      .on('receipt', function (receipt) {
        console.log(receipt);
      });
  }
}

// Function that will allow users to withdraw
function withdraw() {
  var assetSelected;
  var withdrawAmount;

  assetSelected = $('#deposit-asset-select').find(':selected').val();
  withdrawAmount = $('#input-deposit-amount').val();

  if (assetSelected == 'eth') {
    withdrawAmount = web3.utils.toWei(withdrawAmount, 'ether');

    tradingPlatform.methods
      .withdrawEth(withdrawAmount)
      .send()

      .on('transactionHash', function (hash) {
        console.log(hash);
      })

      .on('confirmation', function (confirmationNr) {
        console.log(confirmationNr);
      })

      .on('receipt', function (receipt) {
        console.log(receipt);
      });
  } else {
    withdrawAmount = web3.utils.toWei(withdrawAmount, 'ether');

    tradingPlatform.methods
      .withdrawStake(assetSelected, withdrawAmount)
      .send()

      .on('transactionHash', function (hash) {
        console.log(hash);
      })

      .on('confirmation', function (confirmationNr) {
        console.log(confirmationNr);
      })

      .on('receipt', function (receipt) {
        console.log(receipt);
      });
  }
}

// Function that gets the NFTs when a user is trying to deposit
function getNFTs() {
  var assetSelected;

  $('#deposit-asset-select').on('change', function () {
    $('#deposit-scrollbox ul').remove();

    assetSelected = $('#deposit-asset-select').find(':selected').val();

    if (assetSelected == 'nfylp') {
      lpStakingNFT.methods
        .balanceOf(accounts[0])
        .call()
        .then(function (res) {
          numLPNft = res;

          var i;

          for (i = 0; i < numLPNft; i++) {
            lpStakingNFT.methods
              .tokenOfOwnerByIndex(accounts[0], i)
              .call()
              .then(function (_token) {
                lpStaking.methods
                  .getNFTBalance(_token)
                  .call()
                  .then(function (_balance) {
                    _balance = _balance / 1000000000000000000;

                    $('#mCSB_5_container').append('<ul class="three-col"></ul');

                    $('#mCSB_5_container ul:last').each(function () {
                      $(this).append('<li>ID: ' + _token + '</li>');
                      $(this).append('<li>Value: ' + _balance + '</li>');
                    });

                    $('#mCSB_5_container ul').on('click', function () {
                      $('#mCSB_5_container ul').each(function () {
                        $(this).removeClass('scroll-item-selected');
                      });
                      $(this).addClass('scroll-item-selected');
                    });
                  });
              });
          }
        });
    } else if (assetSelected == 'nfy') {
      nfyStakingNFT.methods
        .balanceOf(accounts[0])
        .call()
        .then(function (res) {
          numLPNft = res;

          var i;

          for (i = 0; i < numLPNft; i++) {
            nfyStakingNFT.methods
              .tokenOfOwnerByIndex(accounts[0], i)
              .call()
              .then(function (_token) {
                nfyStaking.methods
                  .getNFTBalance(_token)
                  .call()
                  .then(function (_balance) {
                    _balance = _balance / 1000000000000000000;

                    $('#mCSB_5_container').append('<ul class="three-col"></ul');

                    $('#mCSB_5_container ul:last').each(function () {
                      $(this).append('<li>ID: ' + _token + '</li>');
                      $(this).append('<li>Value: ' + _balance + '</li>');
                    });

                    $('#mCSB_5_container ul').on('click', function () {
                      $('#mCSB_5_container ul').each(function () {
                        $(this).removeClass('scroll-item-selected');
                      });
                      $(this).addClass('scroll-item-selected');
                    });
                  });
              });
          }
        });
    }
  });
}

// Function that gets NFY Price
function getNFYPrice() {
  var nfyPrice;

  wEth.methods
    .balanceOf(lpAddress)
    .call()
    .then(function (eth) {
      eth = eth / 1000000000000000000;

      nfyToken.methods
        .balanceOf(lpAddress)
        .call()
        .then(function (nfy) {
          nfy = nfy / 1000000000000000000;

          nfyPrice = (eth / nfy).toFixed(5);

          $('#price-sell-nfy').attr('value', nfyPrice);
          $('#price-buy-nfy').attr('value', nfyPrice);
        });
    });
}

// Function that gets LP Price
function getLPPrice() {
  var lpPrice;

  LPTokens.methods
    .totalSupply()
    .call()
    .then(function (lpTotal) {
      lpTotal = lpTotal / 1000000000000000000;

      wEth.methods
        .balanceOf(lpAddress)
        .call()
        .then(function (eth) {
          eth = eth / 1000000000000000000;

          lpPrice = ((2 * eth) / lpTotal).toFixed(5);

          $('#price-sell-lp').attr('value', lpPrice);
          $('#price-buy-lp').attr('value', lpPrice);
        });
    });
}

// Function that gets user's balance in trading platform
function getBalances() {
  var ethBalance;
  var assetBalance;
  var assetSelected;

  $('#deposit-asset-select').on('change', function () {
    assetSelected = $('#deposit-asset-select').find(':selected').val();

    if (assetSelected == 'eth') {
      tradingPlatform.methods
        .getEthBalance(accounts[0])
        .call()
        .then(function (eth) {
          ethBalance = eth / 1000000000000000000;
          $('#input-deposit-value').attr('value', ethBalance);
        });
    } else {
      tradingPlatform.methods
        .getTraderBalance(accounts[0], assetSelected)
        .call()
        .then(function (bal) {
          assetBalance = bal / 1000000000000000000;
          $('#input-deposit-value').attr('value', assetBalance);
        });
    }
  });

  tradingPlatform.methods
    .getTraderBalance(accounts[0], 'nfy')
    .call()
    .then(function (bal) {
      bal = bal / 1000000000000000000;
      $('#nfyDeposited').text(bal);
    });

  tradingPlatform.methods
    .getTraderBalance(accounts[0], 'nfylp')
    .call()
    .then(function (bal) {
      bal = bal / 1000000000000000000;
      $('#lpDeposited').text(bal);
    });

  tradingPlatform.methods
    .getEthBalance(accounts[0])
    .call()
    .then(function (bal) {
      bal = bal / 1000000000000000000;
      $('.ethDeposited').text(bal);
    });
}

// Function that will get the orders for the order book
function getOrders() {
  tradingPlatform.methods
    .getOrders('nfy', 1)
    .call()
    .then(function (orders) {
      for (i = 0; i < orders.length; i++) {
        var amount = orders[i].amount - orders[i].filled;
        $('#mCSB_1_container').append('<ul class="three-col"></ul');
        $('#mCSB_1_container ul:last').append(
          '<li>' + orders[i].price / 1e18 + '</li'
        );
        $('#mCSB_1_container ul:last').append('<li>' + amount / 1e18 + '</li');
        $('#mCSB_1_container ul:last').append(
          '<li>' +
            ((amount / 1e18) * (orders[i].price / 1e18)).toFixed(5) +
            '</li'
        );

        if (orders[i].userAddress == accounts[0]) {
          $('#cancel-nfy-sell').removeClass('opacity');
          $('#mCSB_1_container ul:last').addClass('red');
        }
      }
    });

  tradingPlatform.methods
    .getOrders('nfy', 0)
    .call()
    .then(function (orders) {
      for (i = 0; i < orders.length; i++) {
        var amount = orders[i].amount - orders[i].filled;
        $('#mCSB_2_container').append('<ul class="three-col"></ul');
        $('#mCSB_2_container ul:last').append(
          '<li>' + orders[i].price / 1e18 + '</li'
        );
        $('#mCSB_2_container ul:last').append('<li>' + amount / 1e18 + '</li');
        $('#mCSB_2_container ul:last').append(
          '<li>' +
            ((amount / 1e18) * (orders[i].price / 1e18)).toFixed(5) +
            '</li'
        );

        if (orders[i].userAddress == accounts[0]) {
          $('#cancel-nfy-buy').removeClass('opacity');
          $('#mCSB_2_container ul:last').addClass('green');
        }
      }
    });

  tradingPlatform.methods
    .getOrders('nfylp', 1)
    .call()
    .then(function (orders) {
      for (i = 0; i < orders.length; i++) {
        var amount = orders[i].amount - orders[i].filled;
        $('#mCSB_3_container').append('<ul class="three-col"></ul');
        $('#mCSB_3_container ul:last').append(
          '<li>' + orders[i].price / 1e18 + '</li'
        );
        $('#mCSB_3_container ul:last').append('<li>' + amount / 1e18 + '</li');
        $('#mCSB_3_container ul:last').append(
          '<li>' +
            ((amount / 1e18) * (orders[i].price / 1e18)).toFixed(5) +
            '</li'
        );

        if (orders[i].userAddress == accounts[0]) {
          $('#cancel-nfylp-sell').removeClass('opacity');
          $('#mCSB_3_container ul:last').addClass('red');
        }
      }
    });

  tradingPlatform.methods
    .getOrders('nfylp', 0)
    .call()
    .then(function (orders) {
      for (i = 0; i < orders.length; i++) {
        var amount = orders[i].amount - orders[i].filled;
        $('#mCSB_4_container').append('<ul class="three-col"></ul');
        $('#mCSB_4_container ul:last').append(
          '<li>' + orders[i].price / 1e18 + '</li'
        );
        $('#mCSB_4_container ul:last').append('<li>' + amount / 1e18 + '</li');
        $('#mCSB_4_container ul:last').append(
          '<li>' +
            ((amount / 1e18) * (orders[i].price / 1e18)).toFixed(5) +
            '</li'
        );

        if (orders[i].userAddress == accounts[0]) {
          $('#cancel-nfylp-buy').removeClass('opacity');
          $('#mCSB_4_container ul:last').addClass('green');
        }
      }
    });
}

// Function that cancels user's latest nfy sell order
function cancelNfySellOrder() {
  tradingPlatform.methods
    .cancelOrder('nfy', 1)
    .send()

    .on('transactionHash', function (hash) {
      console.log(hash);
    })

    .on('confirmation', function (confirmationNr) {
      console.log(confirmationNr);
    })

    .on('receipt', function (receipt) {
      console.log(receipt);
    });
}

// Function that cancels user's latest nfy buy order
function cancelNfyBuyOrder() {
  tradingPlatform.methods
    .cancelOrder('nfy', 0)
    .send()

    .on('transactionHash', function (hash) {
      console.log(hash);
    })

    .on('confirmation', function (confirmationNr) {
      console.log(confirmationNr);
    })

    .on('receipt', function (receipt) {
      console.log(receipt);
    });
}

// Function that cancels user's latest nfy/eth lp sell order
function cancelNfyLPSellOrder() {
  tradingPlatform.methods
    .cancelOrder('nfylp', 1)
    .send()

    .on('transactionHash', function (hash) {
      console.log(hash);
    })

    .on('confirmation', function (confirmationNr) {
      console.log(confirmationNr);
    })

    .on('receipt', function (receipt) {
      console.log(receipt);
    });
}

// Function that cancels user's latest nfy/eth lp buy order
function cancelNfyLPBuyOrder() {
  tradingPlatform.methods
    .cancelOrder('nfylp', 0)
    .send()

    .on('transactionHash', function (hash) {
      console.log(hash);
    })

    .on('confirmation', function (confirmationNr) {
      console.log(confirmationNr);
    })

    .on('receipt', function (receipt) {
      console.log(receipt);
    });
}

function connected() {
  var accountsAbrv = accounts[0].slice(0, 7);
  $('.connect_button').text('CONNECTED TO: ' + accountsAbrv + '...');
}

async function connect() {
  try {
    let web3;
    if (window.ethereum) {
      web3 = new Web3(window.ethereum);
      console.log('window.eth');
      await ethereum.enable();
    } else if (window.web3) {
      web3 = new Web3(window.web3.currentProvider);
      console.log('web3');
    }
  } catch (error) {
    // Catch any errors for any of the above operations.
    alert(
      `Failed to load web3, accounts, or contract. Check console for details.`
    );
    console.error(error);
  }

  accounts = await web3.eth.getAccounts();
  nfyToken = new web3.eth.Contract(NFYAbi, nfyAddress, { from: accounts[0] });
  LPTokens = new web3.eth.Contract(LPAbi, lpAddress, { from: accounts[0] });

  nfyStakingV1 = new web3.eth.Contract(NFYStakingABIV1, nfyStakingV1Address, {
    from: accounts[0],
  });
  lpStakingV1 = new web3.eth.Contract(LPStakingABIV1, lpStakingV1Address, {
    from: accounts[0],
  });

  nfyStaking = new web3.eth.Contract(NFYStakingABI, nfyStakingAddress, {
    from: accounts[0],
  });

  nfyStakingNFT = new web3.eth.Contract(
    NFYStakingNFTABI,
    nfyStakingNFTAddress,
    { from: accounts[0] }
  );

  lpStaking = new web3.eth.Contract(LPStakingABI, lpStakingAddress, {
    from: accounts[0],
  });

  lpStakingNFT = new web3.eth.Contract(LPStakingNFTABI, lpStakingNFTAddress, {
    from: accounts[0],
  });

  wEth = new web3.eth.Contract(WETHABI, wEthAddress, { from: accounts[0] });

  tradingPlatform = new web3.eth.Contract(TradingABI, tradingPlatformAddress, {
    from: accounts[0],
  });

  getNfyBalance();
  getLPBalance();

  getTotalNfyStaked();
  getUserStakedNfy();
  getUserNfyNfts();
  getNfyAPY();
  getUserNfyRewards();

  getTotalLpStaked();
  getUserStakedLp();
  getUserLpNfts();
  getLpAPY();
  getUserLpRewards();

  //getUserNfyLPNft();

  nfyInRewardPool();

  checkIfV1NFYUnstaked();
  checkIfV1LPUnstaked();

  getNFYPrice();
  getLPPrice();

  getBalances();
  getNFTs();

  getOrders();

  connected();
  start();
  startlp();
}
