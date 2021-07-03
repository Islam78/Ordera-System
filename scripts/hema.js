
        var TchildData
        // for (item of Tresult) {
        //     TchildData +=
        //         `
        //              <div class="col-12 m-1">
        //                         <div class="card card-2">
        //                             <div class="card-body">
        //                                 <div class="media">
        //                                     <div class="media-body my-auto text-right">
        //                                         <div class="row my-auto flex-column flex-md-row">
        //                                             <div class="col-auto my-auto ">
        //                                                 <h6 class="mb-0">${item.place_name}</h6>
        //                                             </div>
        //                                             <div class="col my-auto ">
        //                                             from location: <small style="font-weight: bold;">${item.from_location} </small>
        //                                             </div>
        //                                             <div class="col my-auto ">
        //                                             to location: <small style="font-weight: bold;"> ${item.to_location}</small>
        //                                             </div>
        //                                         </div>
        //                                     </div>
        //                                 </div>
        //                                 <hr class="my-3">
        //                                 <div class="row " id="${item?.menuId ? item?.menuId : 0}">

        //                                 </div>
        //                             </div>
        //                         </div>
        //                     </div>
        //     `

        //     var TGrandChild
        //     let checkItem = false
        //     item?.menuId ? checkItem = true : checkItem = false;
        //     console.log(checkItem);
        //     if (checkItem === true) {
        //         console.log(item?.menuId);
        //         for (childItem of item.menu) {
        //             TGrandChild +=
        //                 `
        //                 <div class="col-12" >
        //                     <div class="col mt-auto">
        //                         <div class="media row justify-content-between ">
        //                             <div class="col my-auto ">
        //                                 product_name: <small style="font-weight: bold;"> ${childItem.product_name}</small>
        //                             </div>
        //                             <div class="col my-auto ">
        //                                 <small>${childItem.qty} | ${childItem.total / childItem.qty} </small>
        //                             </div>
        //                             <div class="col my-auto ">
        //                                 total: <small style="font-weight: bold; color:red"> ${childItem.total}</small>
        //                             </div>
        //                         </div>

        //                     </div>
        //                 </div>
        //             `
        //             // setTimeout(() => {
        //             TGrandChild = TGrandChild ? TGrandChild.replace('undefined', '') : ''
        //             document.getElementById(`${item.menuId}`).innerHTML = TGrandChild
        //             console.log(document.getElementById(`${item.menuId}`));
        //             // }, 1);
        //         }
        //     }
        // }

        // TchildData = TchildData ? TchildData.replace('undefined', '') : ''
        // document.getElementById('DelivaryItems').innerHTML = TchildData

