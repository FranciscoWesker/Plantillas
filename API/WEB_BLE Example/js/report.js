// var currentUser = Parse.User.current();
// var userId = "q3Z1x0RDnR";
Module.onRuntimeInitialized = _ => {
    const GetRevNumber = Module.cwrap('GetRevNumber', 'number', ['']);
    const SetDebugMode = Module.cwrap('SetDebugMode', '', ['number']);
    const InitUser = Module.cwrap('InitUser', '', ['number', 'number', 'number', 'number', 'number', 'number', 'number' ]);
    const SetSensorSpecNew = Module.cwrap('SetSensorSpecNew', '', ['number', 'number', 'number', 'number', 'number', 'number', 'number', 'number', 'number', 'number', 'number', 'number' ]);
    const ProcessStride_FSR = Module.cwrap('ProcessStride_FSR', 'number', ['number', 'number', 'number', 'number', 'number', 'number', 'number', 'number', 'number', 'number' ]);
    const ProcessStride_FSR_grid = Module.cwrap('ProcessStride_FSR_grid', 'number', ['number', 'number', 'number', 'number', 'number', 'number', 'number', 'number', 'number' ]);
    const ProcessStride_FSR_bb_grid = Module.cwrap('ProcessStride_FSR_bb_grid', 'number', ['number', 'number', 'number', 'number', 'number' ]);
    const GetCurrStride_time = Module.cwrap('GetCurrStride_time', 'number', ['number']);
    const GetCurrStress_front = Module.cwrap('GetCurrStress_front', 'number', ['number']);
    const GetCurrStress_front_2 = Module.cwrap('GetCurrStress_front_2', 'number', ['number']);
    const GetCurrStress_mid = Module.cwrap('GetCurrStress_mid', 'number', ['number']);
    const GetCurrStress_arch = Module.cwrap('GetCurrStress_arch', 'number', ['number']);
    const GetCurrStress_heel = Module.cwrap('GetCurrStress_heel', 'number', ['number']);
    const GetUserInfo_ht = Module.cwrap('GetUserInfo_ht', 'number', ['']);
    const GetRunInfo_time = Module.cwrap('GetRunInfo_time', 'number', ['']);
  
  
    console.log(GetRevNumber(10));
      SetDebugMode(0);
  
    InitUser (175, 72000, 26, 28, 1, 0, 0);
    SetSensorSpecNew(5, 9, 6, 7, 4, 8, 8, 5, 9, 2, 3, 1);
  
    console.log(GetUserInfo_ht());
  
var date = "";
var dates;
var name = "";
var drName = "";
var activity;
var activityId;
var countStrike =[];
var stressBBSAH = [];
var stressF1F2MAH1H2T1T2 = [];
var stepCount=0;
var lengthRateGCT=[];
var stressArray=[];
var stressParseArray=[];
var customerEmail='';
var shoeRecommendation=[];
var leftTotalCount = 0, leftHeelCount = 0, leftMidCount = 0, leftFrontCount = 0, leftTotal = 0;
var rightTotalCount = 0, rightHeelCount = 0, rightMidCount = 0, rightFrontCount = 0, rightTotal = 0;
var totalStep = 0;
var leftOverPronate = 0, rightOverPronate = 0, leftFootNormal = 0, rightFootNormal = 0;
var leftOverStride = 0, rightOverStride = 0, leftOverStrideNormal = 0, rightOverStrideNormal = 0;
var strideLengthLeft = 0, strideLengthRight = 0;
var strideRateLeft = 0, strideRateRight = 0;
var gctLeft = 0, gctRight = 0;
var avgStrideRate = 0;
var balance = 100;
var totalTime = 0;
var stepCountFlag = true;
var strideRateFlag = true;
var stridelengthFlag = true;
var gCTFlag = true;
var footMovementFlag = true;
var strikeDistributionFlag = true;
var overStrideFlag = true;
var bodyBalanceFlag = true;
var stressValueFlag = true;
var stressMapFlag = true;
var feedbackOneFlag = true;
var tableMapFlag = true;
var currentStride;
var logo = false;
var customertype = ""
var LocalData= [ {
                "count":1,
                "mode":"WALK",
                "totalTime":31,
                "leftCountStrike":[27, 10,2,15],
                "leftLengthRateGCT":[80, 140, 220, 20, 20],
                "leftStress":[12, 15, 5, 0, 20, 15, 5, 10],
                // "leftStressGrid":[
                //     0, 0, 0,1, 0, 0, 0,
                //     0, 0, 6, 6, 5, 5, 0,
                //     0, 0, 6, 6, 5, 5, 0,
                //     0, 0, 6, 6, 5, 0, 0,
                //     0, 0, 6, 6, 5, 0, 0,
                //     0, 0, 3, 6, 5, 0, 0,
                //     0, 0, 3, 3, 4, 0, 0,
                //     0, 3, 3, 3, 4, 4, 0,
                //     3, 3, 3, 3, 4, 4, 0,
                //     2, 2, 2, 2, 1, 1, 0,
                //     0, 2, 2, 2, 1, 1, 1,
                //     0, 2, 2, 2, 1, 1, 1,
                //     0, 0, 8, 2, 1, 1, 7,
                //     0, 0, 8, 2, 1, 1, 7,
                //     0, 0, 8, 8, 8, 7, 0,
                //     0, 0, 0, 8, 8, 7, 0,
                //     0, 0, 0, 0, 8, 0, 0,
                //     0, 0, 0, 0, 0, 0, 0
                //     ],
                "rightCountStrike":[30, 12,6,12],
                "rightLengthRateGCT":[85, 140, 210, 10, 30],
                "rightStress":[15, 12, 0, 5, 22, 10, 2, 20],
                "rightStressGrid":[
                    0, 0, 0, 0, 0, 0, 0,
                    0, 0, 6, 6, 5, 5, 0,
                    0, 0, 6, 6, 5, 5, 0,
                    0, 0, 6, 6, 5, 0, 0,
                    0, 0, 6, 6, 5, 0, 0,
                    0, 0, 3, 6, 5, 0, 0,
                    0, 0, 3, 3, 4, 0, 0,
                    0, 3, 3, 3, 4, 4, 0,
                    3, 3, 3, 3, 4, 4, 0,
                    2, 2, 2, 2, 1, 1, 0,
                    0, 2, 2, 2, 1, 1, 1,
                    0, 2, 2, 2, 1, 1, 1,
                    0, 0, 8, 2, 1, 1, 7,
                    0, 0, 8, 2, 1, 1, 7,
                    0, 0, 8, 8, 8, 7, 0,
                    0, 0, 8, 8, 8, 7, 0,
                    0, 0, 0, 0, 8, 0, 0,
                    0, 0, 0, 0, 0, 0, 0
                ],
                "userID":"qoa1uwmYtK",
                "email":"prashantgaurav@retisense.com"
                },{
                    "count":2,
                    "mode":"WALK",
                    "totalTime":31,
                    "leftCountStrike":[27, 10,2,15],
                    "leftLengthRateGCT":[80, 140, 220, 20, 20],
                    "leftStress":[12, 15, 5, 0, 20, 15, 5, 10],
                    // "leftStressGrid":[
                    //     0, 0, 0,1, 0, 0, 0,
                    //     0, 0, 6, 6, 5, 5, 0,
                    //     0, 0, 6, 6, 5, 5, 0,
                    //     0, 0, 6, 6, 5, 0, 0,
                    //     0, 0, 6, 6, 5, 0, 0,
                    //     0, 0, 3, 6, 5, 0, 0,
                    //     0, 0, 3, 3, 4, 0, 0,
                    //     0, 3, 3, 3, 4, 4, 0,
                    //     3, 3, 3, 3, 4, 4, 0,
                    //     2, 2, 2, 2, 1, 1, 0,
                    //     0, 2, 2, 2, 1, 1, 1,
                    //     0, 2, 2, 2, 1, 1, 1,
                    //     0, 0, 8, 2, 1, 1, 7,
                    //     0, 0, 8, 2, 1, 1, 7,
                    //     0, 0, 8, 8, 8, 7, 0,
                    //     0, 0, 0, 8, 8, 7, 0,
                    //     0, 0, 0, 0, 8, 0, 0,
                    //     0, 0, 0, 0, 0, 0, 0
                    //     ],
                    "rightCountStrike":[30, 12,6,12],
                    "rightLengthRateGCT":[85, 140, 210, 10, 30],
                    "rightStress":[15, 12, 0, 5, 22, 100, 2, 20],
                    "rightStressGrid":[
                        0, 0, 0, 0, 0, 0, 0,
                        0, 0, 6, 6, 5, 5, 0,
                        0, 0, 6, 6, 5, 5, 0,
                        0, 0, 6, 6, 5, 0, 0,
                        0, 0, 6, 6, 5, 0, 0,
                        0, 0, 3, 6, 5, 0, 0,
                        0, 0, 3, 3, 4, 0, 0,
                        0, 3, 3, 3, 4, 4, 0,
                        3, 3, 3, 3, 4, 4, 0,
                        2, 2, 2, 2, 1, 1, 0,
                        0, 2, 2, 2, 1, 1, 1,
                        0, 2, 2, 2, 1, 1, 1,
                        0, 0, 8, 2, 1, 1, 7,
                        0, 0, 8, 2, 1, 1, 7,
                        0, 0, 8, 8, 8, 7, 0,
                        0, 0, 8, 8, 8, 7, 0,
                        0, 0, 0, 0, 8, 0, 0,
                        0, 0, 0, 0, 0, 0, 0
                    ],
                    "userID":"qoa1uwmYtK",
                    "email":"prashantgaurav@retisense.com"
                    },{
                        "count":3,
                        "mode":"WALK",
                        "totalTime":31,
                        "leftCountStrike":[27, 10,2,15],
                        "leftLengthRateGCT":[80, 140, 220, 20, 20],
                        "leftStress":[12, 15, 5, 0, 20, 15, 5, 10],
                        // "leftStressGrid":[
                        //     0, 0, 0,1, 0, 0, 0,
                        //     0, 0, 6, 6, 5, 5, 0,
                        //     0, 0, 6, 6, 5, 5, 0,
                        //     0, 0, 6, 6, 5, 0, 0,
                        //     0, 0, 6, 6, 5, 0, 0,
                        //     0, 0, 3, 6, 5, 0, 0,
                        //     0, 0, 3, 3, 4, 0, 0,
                        //     0, 3, 3, 3, 4, 4, 0,
                        //     3, 3, 3, 3, 4, 4, 0,
                        //     2, 2, 2, 2, 1, 1, 0,
                        //     0, 2, 2, 2, 1, 1, 1,
                        //     0, 2, 2, 2, 1, 1, 1,
                        //     0, 0, 8, 2, 1, 1, 7,
                        //     0, 0, 8, 2, 1, 1, 7,
                        //     0, 0, 8, 8, 8, 7, 0,
                        //     0, 0, 0, 8, 8, 7, 0,
                        //     0, 0, 0, 0, 8, 0, 0,
                        //     0, 0, 0, 0, 0, 0, 0
                        //     ],
                        "rightCountStrike":[30, 12,6,12],
                        "rightLengthRateGCT":[85, 140, 210, 10, 30],
                        "rightStress":[15, 12, 0, 5, 22, 10, 100, 20],
                        "rightStressGrid":[
                            0, 0, 0, 0, 0, 0, 0,
                            0, 0, 6, 6, 5, 5, 0,
                            0, 0, 6, 6, 5, 5, 0,
                            0, 0, 6, 6, 5, 0, 0,
                            0, 0, 6, 6, 5, 0, 0,
                            0, 0, 3, 6, 5, 0, 0,
                            0, 0, 3, 3, 4, 0, 0,
                            0, 3, 3, 3, 4, 4, 0,
                            3, 3, 3, 3, 4, 4, 0,
                            2, 2, 2, 2, 1, 1, 0,
                            0, 2, 2, 2, 1, 1, 1,
                            0, 2, 2, 2, 1, 1, 1,
                            0, 0, 8, 2, 1, 1, 7,
                            0, 0, 8, 2, 1, 1, 7,
                            0, 0, 8, 8, 8, 7, 0,
                            0, 0, 8, 8, 8, 7, 0,
                            0, 0, 0, 0, 8, 0, 0,
                            0, 0, 0, 0, 0, 0, 0
                        ],
                        "userID":"qoa1uwmYtK",
                        "email":"prashantgaurav@retisense.com"
                        },{
                            "count":4,
                            "mode":"WALK",
                            "totalTime":31,
                            "leftCountStrike":[27, 10,2,15],
                            "leftLengthRateGCT":[80, 140, 220, 20, 20],
                            "leftStress":[12, 15, 5, 0, 20, 15, 5, 10],
                            // "leftStressGrid":[
                            //     0, 0, 0,1, 0, 0, 0,
                            //     0, 0, 6, 6, 5, 5, 0,
                            //     0, 0, 6, 6, 5, 5, 0,
                            //     0, 0, 6, 6, 5, 0, 0,
                            //     0, 0, 6, 6, 5, 0, 0,
                            //     0, 0, 3, 6, 5, 0, 0,
                            //     0, 0, 3, 3, 4, 0, 0,
                            //     0, 3, 3, 3, 4, 4, 0,
                            //     3, 3, 3, 3, 4, 4, 0,
                            //     2, 2, 2, 2, 1, 1, 0,
                            //     0, 2, 2, 2, 1, 1, 1,
                            //     0, 2, 2, 2, 1, 1, 1,
                            //     0, 0, 8, 2, 1, 1, 7,
                            //     0, 0, 8, 2, 1, 1, 7,
                            //     0, 0, 8, 8, 8, 7, 0,
                            //     0, 0, 0, 8, 8, 7, 0,
                            //     0, 0, 0, 0, 8, 0, 0,
                            //     0, 0, 0, 0, 0, 0, 0
                            //     ],
                            "rightCountStrike":[30, 12,6,12],
                            "rightLengthRateGCT":[85, 140, 210, 10, 30],
                            "rightStress":[15, 12, 0, 5, 22, 10, 2, 20],
                            "rightStressGrid":[
                                0, 0, 0, 0, 0, 0, 0,
                                0, 0, 6, 6, 5, 5, 0,
                                0, 0, 6, 6, 5, 5, 0,
                                0, 0, 6, 6, 5, 0, 0,
                                0, 0, 6, 6, 5, 0, 0,
                                0, 0, 3, 6, 5, 0, 0,
                                0, 0, 3, 3, 4, 0, 0,
                                0, 3, 3, 3, 4, 4, 0,
                                3, 3, 3, 3, 4, 4, 0,
                                2, 2, 2, 2, 1, 1, 0,
                                0, 2, 2, 2, 1, 1, 1,
                                0, 2, 2, 2, 1, 1, 1,
                                0, 0, 8, 2, 1, 1, 7,
                                0, 0, 8, 2, 1, 1, 7,
                                0, 0, 8, 8, 8, 7, 0,
                                0, 0, 8, 8, 8, 7, 0,
                                0, 0, 0, 0, 8, 0, 0,
                                0, 0, 0, 0, 0, 0, 0
                            ],
                            "userID":"qoa1uwmYtK",
                            "email":"prashantgaurav@retisense.com"
                            }]
                
console.log(LocalData[1].leftStress);
                
// var link = window.location.href;

// if(link.includes("?id")){
//     if(link.includes("&customertype")){
//         var idNdCustomerSplit = link.split('&customertype=');
//         customerTypeVal = idNdCustomerSplit[1];
//         var encodedIddVal = idNdCustomerSplit[0].split('id=')[1];
//         if(encodedIddVal != 'local'){
//             // show  1. sakra logo 2. decrease font size 3. bring patient name below 4. hide the default heading
//             if(customerTypeVal==="SAKRA"){
//             logo = true;
//             imgSrc = "img/sakra-logo.png";
//             $('#headingLogo').css("display","block");
//             $('#headingLogo img').attr("src",imgSrc);
//             $('#headingNoLogo').css("display","none");
            
//             // for font size & image size
//                 if($(window).width() <= 320){
//                     $('#headingLogo img').attr("width","50px"); // logo width
//                     $('#headingLogo img').attr("height","25px"); // logo height
//                     $('#headingLogo h2').css("font-size","18px"); // font size
//                     $('#userIfLogo').css("width","150px");
//                 }else if($(window).width() > 321 && $(window).width() <= 375){
//                     $('#headingLogo img').attr("width","64px"); // logo width
//                     $('#headingLogo img').attr("height","32px"); // logo height
//                     $('#headingLogo h2').css("font-size","18px"); // font size
//                     $('#userIfLogo').css("width","150px");
//                 } else if($(window).width() > 376 && $(window).width() <= 414){
//                     $('#headingLogo img').attr("width","76px"); // logo width
//                     $('#headingLogo img').attr("height","38px"); // logo height
//                     $('#headingLogo h2').css("font-size","20px"); // font size
//                     $('#userIfLogo').css("width","150px");
//                 } else if($(window).width() > 414 && $(window).width() <= 768){
//                     $('#headingLogo img').attr("width","130px"); // logo width
//                     $('#headingLogo img').attr("height","65px"); // logo height
//                     // $('#headingLogo h2').css("font-size","24px"); // font size
//                 } else if($(window).width() > 768 && $(window).width() <= 1024){
//                     $('#headingLogo img').attr("width","170px"); // logo width
//                     $('#headingLogo img').attr("height","85px"); // logo height
//                     $('#headingLogo h2').css("font-size","34px"); // font size
//                 }else{
//                     $('#headingLogo img').attr("width","150px"); // logo width
//                     $('#headingLogo img').attr("height","75px"); // logo height
//                     $('#headingLogo h2').css("font-size","34px"); // font size
//                 }

//             }
//             // console.log("yes, there is customer type & id but no local data");
//             userId = decodeUserId(encodedIddVal);
//             console.log(userId);
//             showSummary(userId);
//         } else{
//             // show  1. sakra logo 2. decrease font size 3. bring patient name below
            
//             if(customerTypeVal==="SAKRA"){
//                 logo = true;
//                 imgSrc = "img/sakra-logo.png";
//                 $('#headingLogo').css("display","block");
//                 $('#headingLogo img').attr("src",imgSrc);
//                 $('#headingNoLogo').css("display","none");
                
//                 // for font size & image size
//                 if($(window).width() <= 320){
//                     $('#headingLogo img').attr("width","60px"); // logo width
//                     $('#headingLogo img').attr("height","60px"); // logo height
//                     $('#headingLogo h2').css("font-size","18px"); // font size
//                     $('#userIfLogo').css("width","150px");
//                 }else if($(window).width() > 321 && $(window).width() <= 375){
//                     $('#headingLogo img').attr("width","75px"); // logo width
//                     $('#headingLogo img').attr("height","75px"); // logo height
//                     $('#headingLogo h2').css("font-size","18px"); // font size
//                     $('#userIfLogo').css("width","150px");
//                 } else if($(window).width() > 376 && $(window).width() <= 414){
//                     $('#headingLogo img').attr("width","85px"); // logo width
//                     $('#headingLogo img').attr("height","85px"); // logo height
//                     $('#headingLogo h2').css("font-size","20px"); // font size
//                     $('#userIfLogo').css("width","150px");
//                 } else if($(window).width() > 414 && $(window).width() <= 768){
//                     $('#headingLogo img').attr("width","130px"); // logo width
//                     $('#headingLogo img').attr("height","130px"); // logo height
//                     // $('#headingLogo h2').css("font-size","24px"); // font size
//                 } else if($(window).width() > 768 && $(window).width() <= 1024){
//                     $('#headingLogo img').attr("width","170px"); // logo width
//                     $('#headingLogo img').attr("height","170px"); // logo height
//                     $('#headingLogo h2').css("font-size","34px"); // font size
//                 }

//             }
//             // console.log("yes, there is customer type and local data");
//           //  fetchLocalData(LocalData);
//         }
//     } else{
//         var lim = link.split('?');
//         var lin = lim[1].split("id=");
//         var encodedId =lin[1];
//         if(encodedId != 'local'){
//             // console.log("there is no local data & no customer type BUT there is id");
//             userId = decodeUserId(""+encodedId);
//             showSummary(userId);
//         }
//         else{
//             // console.log("there is local data but no customer type");
//             //fetchLocalData(LocalData);
//         }        
//     }
// }else {
//     if(link.includes("?customertype")){
//         // console.log("yes 2 there is customer type but no locALDATA");
//         var ifCustomer = link.split('=');
//         var customerType =ifCustomer[1];
//         console.log(customerType);
        
//         // show  1. sakra logo 2. decrease font size 3. bring patient name below
//         if(customerTypeVal==="SAKRA"){
//             logo = true;
//             imgSrc = "img/sakra-logo.png";
//             $('#headingLogo').css("display","block");
//             $('#headingLogo img').attr("src",imgSrc);
//             $('#headingNoLogo').css("display","none");
            
//             // for font size & image size
//             if($(window).width() <= 320){
//                 $('#headingLogo img').attr("width","60px"); // logo width
//                 $('#headingLogo img').attr("height","60px"); // logo height
//                 $('#headingLogo h2').css("font-size","18px"); // font size
//                 $('#userIfLogo').css("width","150px");
//             }else if($(window).width() > 321 && $(window).width() <= 375){
//                 $('#headingLogo img').attr("width","75px"); // logo width
//                 $('#headingLogo img').attr("height","75px"); // logo height
//                 $('#headingLogo h2').css("font-size","18px"); // font size
//                 $('#userIfLogo').css("width","150px");
//             } else if($(window).width() > 376 && $(window).width() <= 414){
//                 $('#headingLogo img').attr("width","85px"); // logo width
//                 $('#headingLogo img').attr("height","85px"); // logo height
//                 $('#headingLogo h2').css("font-size","20px"); // font size
//                 $('#userIfLogo').css("width","150px");
//             } else if($(window).width() > 414 && $(window).width() <= 768){
//                 $('#headingLogo img').attr("width","130px"); // logo width
//                 $('#headingLogo img').attr("height","130px"); // logo height
//                 // $('#headingLogo h2').css("font-size","24px"); // font size
//             } else if($(window).width() > 768 && $(window).width() <= 1024){
//                 $('#headingLogo img').attr("width","170px"); // logo width
//                 $('#headingLogo img').attr("height","170px"); // logo height
//                 $('#headingLogo h2').css("font-size","34px"); // font size
//             }
//         }
//         showSummary("activityId");
//     } else{showSummary("activityId");
//         // console.log("there is no local data and no customer type");
        
//     // fetchLocalData("LocalData");
//     }
// }

// var LocalData = "WALK#45#4,4,6,8,5,1,1,1#1,3,3,5,0,9,1,6,2,0#1,7,4,5,1,3,1,1,1,75#r34det34gd#Prashant#prashantgaurav270@gmail.com"; var currentLang =["en"];
// var LocalData = "WALK#45#4,4,6,8,5,1,1,1#1,3,3,5,0,9,1,6,2,0#1,6,0,0,12,0,0,0,3,8,0,0,16,0,0,0#r34det34gd#Prashant#prashantgaurav270@gmail.com"; var currentLang =["en"];

//F1F2MAH1H2T1T2  //F1F2MAH1H2T1T2
// var LocalData = "STAND#31#0,0,0,0,0,0,0,0#0,0,0,100,0,0,0,0,100,0#12,7,2,0,13,0,4,0,6,13,0,0,2,0,7,0#qoa1uwmYtK#prashant#prashantgaurav@retisense.com"; var currentLang =["en"];
// var LocalData = "STAND#31#0,0,0,0,0,0,0,0#0,0,0,100,0,0,0,0,100,0#12,7,2,0,13,0,4,0,6,13,0,0,22,0,7,0#qoa1uwmYtK#prashant#prashantgaurav@retisense.com"; var currentLang =["en"];
// var LocalData = "STAND#31#0,0,0,0,0,0,0,0#0,0,0,100,0,0,0,0,100,0#12,7,2,0,13,0,4,0,6,13,0,0,22,0,7,0#qoa1uwmYtK#prashant#prashantgaurav@retisense.com"; var currentLang =["en"];
// var LocalData = "STAND#41#0,0,0,0,0,0,0,0#0,0,0,100,0,0,0,0,100,0#1,6,0,0,12,0,0,0,3,8,0,0,16,0,0,0#qoa1uwmYtK#Singh#Singhji@gmail.com";var currentLang =["en"];
//F1F2MAH1H2T1T2
  fetchLocalData(LocalData);
// this function gets called from IOS for seeing the report just after activity gets over.

// var slider = document.getElementById("myRange");
// var output = document.getElementById("demo");
// output.innerHTML = slider.value;

// slider.oninput = function() {
//   output.innerHTML = this.value;
// }
// console.log(output.innerHTML);
function call(){
    var slider = document.getElementById("myRange");
    var output = document.getElementById("demo");
    output.innerHTML = slider.value;

    slider.oninput = function() {
    output.innerHTML = this.value;
    }
    console.log(output.innerHTML);
    var x=output.innerHTML;
console.log(x);
jsontexts=LocalData;
        
        //value fetched by slider
        //console.log(output.innerHTML);
        var i=x;
      console.log(i);
      if(LocalData[i]==undefined){
          i=2;
      }
        leftStress=LocalData[i].leftStress;
        rightStress=LocalData[i].rightStress;
        var left_total = leftStress[0] + leftStress[1] + leftStress[2] + leftStress[3] + leftStress[4] + leftStress[5] + leftStress[6] + leftStress[7];
        var right_total = rightStress[0] + rightStress[1] + rightStress[2] + rightStress[3] + rightStress[4] + rightStress[5] + rightStress[6] + rightStress[7];
        // var left_total = stressBBSAH[0] + stressBBSAH[1] + stressBBSAH[2] + stressBBSAH[3] + stressBBSAH[4] ;
        // var right_total =  stressBBSAH[5] + stressBBSAH[6] + stressBBSAH[7] + stressBBSAH[8] + stressBBSAH[9] ;
    
        right_total = (right_total == 0) ? left_total : right_total;
        left_total = (left_total == 0) ? right_total : left_total;
        var stress ;
        if (left_total == 0 && right_total == 0) {
            displayFootImage();
            $('#stressTable').css('display', 'none');
            stressValueFlag = false;
        } else {
            var counter = 0;
            for (var i = 0; i < leftStress.length; i++) {
                stress = leftStress[i];
                stressArray[counter] = parseInt(stress);
                counter++;
            }
            for (var i = 0; i < rightStress.length; i++) {
                stress = rightStress[i];
                stressArray[counter] = parseInt(stress);
                counter++;
            }
    
    
            // for parse we have array stressArray as two array(left and right) in an array
            var i,j,temparray,chunk = 8; // 8 for each left and right
            for (i=0,j=stressBBSAH.length; i<j; i+=chunk) {
                temparray = stressBBSAH.slice(i,i+chunk);
                stressParseArray.push(temparray); // pushing 2 arrays in one array i,e; left and right array in one array
            }
           // displayStressTable(stressArray);
            // displayStressMap(stressArray);
           displayLocalMap(stressArray);
    

}
}
    
    function fetchLocalData(LocalData){
        jsontexts=LocalData;
        
        //value fetched by slider
        //console.log(output.innerHTML);
        var i=1;
      console.log(i);
        
        console.log(LocalData[i]);
        // var acct11 = LocalData.split('#');
        // // console.log(acct11);
        // activity = acct11[0];
        activity = LocalData[i].mode;
        console.log(activity);
        // totalTime = parseInt(acct11[1]);
        // console.log(totalTime);
        totalTime=LocalData[i].totalTime;
        console.log(totalTime);
        dates = new Date();
        
        // countStrike = JSON.parse("["+acct11[2]+"]");
        // console.log(countStrike);
        leftCountStrike=LocalData[i].leftCountStrike;
        console.log(leftCountStrike);
        rightCountStrike=LocalData[i].rightCountStrike;
        console.log(rightCountStrike);
    
        
        //  lengthRateGCT = JSON.parse("["+acct11[3]+"]");
        // console.log(lengthRateGCT);
        rightLengthRateGCT=LocalData[i].rightLengthRateGCT;
        console.log(rightLengthRateGCT);
        leftLengthRateGCT=LocalData[i].leftLengthRateGCT;
        console.log(leftLengthRateGCT);
        
        //
        leftStress=LocalData[i].leftStress;
        rightStress=LocalData[i].rightStress;
        
        // stressBBSAH = JSON.parse("["+acct11[4]+"]");
        // console.log(stressBBSAH);
        // // check for backward compatibility // adding 3-3 extra zeros at 6th place and 13th place to make total of 16 digit 
        // if(stressBBSAH.length == 10){
        //     stressBBSAH.splice(5, 0, 0); stressBBSAH.splice(5, 0, 0); stressBBSAH.splice(5, 0, 0);    
        //     stressBBSAH.splice(13, 0, 0); stressBBSAH.splice(13, 0, 0); stressBBSAH.splice(13, 0, 0);    
        // } else{
        //     // no need to increase array size, its already 16
        // }
    
        // userId = acct11[5];
        // console.log(userId);
        userId=LocalData[i].userID;
        console.log(userId);
        
        // name = acct11[6];
        // console.log(name);
        
        // customerEmail = acct11[7];
        // console.log(customerEmail);
        customerEmail = LocalData[i].email;
        console.log(customerEmail);
        
        //Analysis Mode
        if (activity == undefined || activity.length <= 0) {
            $('#activityRow').css('display', 'none');
        } else {
            $('#activity').text(activity);
        }
    
        //Customer Name
        if (name == undefined || name == "undefined" || name.length <= 0) {
            //$('#user-name').css('display','none');
            console.log(name);
            $('#user').css('display', 'none');
            // for sakra logo ussername
            $('#userIfLogo').css('display', 'none');
            name = "";
        } else {
            console.log(name);
            if(logo == true){
                $('#userIfLogo').text("Patient\'s name: " +name);
            } else{
                $('#user').text(name + "'s");
            }
        }
    
        //Date
        date = (dates.toDateString()).split(' ');
        dates = date[1] + ' ' + date[2] + ', ' + date[3];
        console.log(dates);
        $('#assessment-date').text(dates);
    
        //Duration
        var min = Math.floor(totalTime / 60);
        var sec = (totalTime % 60).toFixed(0);
        $('#min').text(min);
        $('#sec').text(sec);
    
        if( activity == "STAND"){
            $('#totalSteps').css('display', 'none');
            $('#totalStrideRate').css('display', 'none');
            $('#totalStrideLength').css('display', 'none');
            $('#totalGCT').css('display', 'none');
            $('#totalStrike').css('display', 'none');
            $('#totalOverStride').css('display', 'none');
    
            $('#duration').addClass("col-sm-offset-4");
            $('#totalOverPronate').addClass("col-md-offset-2");
            $('#totalBalance').addClass("col-md-offset-2");
        }else{
            //Step Count
            rightTotalCount = parseInt(rightCountStrike[0]); // right stepCount
           leftTotalCount = parseInt(leftCountStrike[0]);//left stepCount
            totalStep = rightTotalCount + leftTotalCount;
            if (totalStep != 0) {
                $('#stepCountLeft').text(totalStep);
            } else {
                //$('#totalSteps').css('display','none');
                stepCountFlag = false;
            }
    
            //Stride Rate
            strideRateLeft = parseInt(leftLengthRateGCT[1]);	//stride rate
            strideRateRight = parseInt(rightLengthRateGCT[1]);
            if (strideRateLeft == 0 && strideRateRight == 0) {
                strideRateFlag = false;
            } else {
                //avgStrideRate= parseInt((strideRateLeft+strideRateRight)/2);
                if (strideRateLeft == 0) {
                    avgStrideRate = strideRateRight;
                } else if (strideRateRight == 0) {
                    avgStrideRate = strideRateLeft;
                } else {
                    avgStrideRate = strideRateLeft;
                }
                $('#avgStrideRate').text(avgStrideRate);
            }
            
            //Stride Length
            strideLengthLeft = parseInt(leftLengthRateGCT[0]); //stride length
            console.log(strideLengthLeft);
            strideLengthRight = parseInt(rightLengthRateGCT[0]);
            console.log(strideLengthRight);
    
            if (strideLengthLeft == 0 && strideLengthRight == 0) {
                //$('#totalStrideLength').css('display','none');
                stridelengthFlag = false;
            } else {
                if (strideLengthLeft == 0) {
                    //$('.strideLeftDisplay').css('display','none');
                    //$('.strideRightDisplay').css('float','none');
                } else {
                    $('#strideLengthLeft').text(strideLengthLeft);
                }
                if (strideLengthRight == 0) {
                    //$('.strideRightDisplay').css('display','none');
                    //$('.strideLeftDisplay').css('float','none');
                } else {
                    $('#strideLengthRight').text(strideLengthRight);
                }
            }
    
            //GCT
            gctLeft = parseInt(leftLengthRateGCT[2]);   //gct s
            gctRight = parseInt(rightLengthRateGCT[2]);    
            if (gctLeft == 0 && gctRight == 0) {
                gCTFlag = false;
            } else {
                if (gctLeft == 0) {} else {
                    $('#gctLeft').text(gctLeft);
                }
                if (gctRight == 0) {} else {
                    $('#gctRight').text(gctRight);
                }
            }    
    
    
            //Strike Distribution
            // Fetch Left Foot Strike
            rightHeelCount = parseInt(rightCountStrike[1]);
            rightMidCount = parseInt(rightCountStrike[2]);
            rightFrontCount = parseInt(rightCountStrike[3]);
            rightTotal = rightFrontCount + rightMidCount + rightHeelCount;
            // Fetch Right Foot Strike
            leftHeelCount = parseInt(leftCountStrike[1]);
            leftMidCount = parseInt(leftCountStrike[2]);
            leftFrontCount = parseInt(leftCountStrike[3]);
            leftTotal = leftFrontCount + leftMidCount + leftHeelCount;
            
            if ((rightTotal == 0) && (leftTotal == 0)) {
                $('#totalStrike').css('display', 'none');
                strikeDistributionFlag = false;
            } else {
                if (leftTotal !== 0) {
                    leftFrontCount /= leftTotal;
                    leftMidCount /= leftTotal;
                    leftHeelCount /= leftTotal;
                    leftFrontCount = Math.round(leftFrontCount * 100) / 1;
                    leftMidCount = Math.round(leftMidCount * 100) / 1;
                    leftHeelCount = Math.round(leftHeelCount * 100) / 1;
                    leftStrikeDonut(leftFrontCount, leftMidCount, leftHeelCount); //left strike donut
                } else {
                    $('#leftStrike').css('display', 'none');
                }
                if (rightTotal !== 0) {
                    rightFrontCount /= rightTotal;
                    rightMidCount /= rightTotal;
                    rightHeelCount /= rightTotal;
                    rightFrontCount = Math.round(rightFrontCount * 100) / 1;
                    rightMidCount = Math.round(rightMidCount * 100) / 1;
                    rightHeelCount = Math.round(rightHeelCount * 100) / 1;
                    rightStrikeDonut(rightFrontCount, rightMidCount, rightHeelCount); //right strike donut
                } else {
                    $('#rightStrike').css('display', 'none');
                }
            }
            // Over Stride
            leftOverStride = parseInt(leftLengthRateGCT[4]);
            rightOverStride = parseInt(rightLengthRateGCT[4]);
            leftOverStrideDonut(100 - leftOverStride, leftOverStride); //left over stride donut
            rightOverStrideDonut(100 - rightOverStride, rightOverStride); //right over stride donut
            if (totalStep == 0) {
                $('#totalOverStride').css('display', 'none');
                overStrideFlag = false;
            }
    
        }
    
        $(".loader").fadeOut(500);
    
    
        //Foot Movement
        leftOverPronate = parseInt(leftLengthRateGCT[3]);                //over pronate
        rightOverPronate = parseInt(rightLengthRateGCT[3]);
        leftFootDonut(100 - leftOverPronate, leftOverPronate); // left overpronate donut
        rightFootDonut(100 - rightOverPronate, rightOverPronate);// right overpronate donut
    
        // Stress Map & Stress Table
        var left_total = leftStress[0] + leftStress[1] + leftStress[2] + leftStress[3] + leftStress[4] + leftStress[5] + leftStress[6] + leftStress[7];
        var right_total = rightStress[0] + rightStress[1] + rightStress[2] + rightStress[3] + rightStress[4] + rightStress[5] + rightStress[6] + rightStress[7];
        // var left_total = stressBBSAH[0] + stressBBSAH[1] + stressBBSAH[2] + stressBBSAH[3] + stressBBSAH[4] ;
        // var right_total =  stressBBSAH[5] + stressBBSAH[6] + stressBBSAH[7] + stressBBSAH[8] + stressBBSAH[9] ;
    
        right_total = (right_total == 0) ? left_total : right_total;
        left_total = (left_total == 0) ? right_total : left_total;
        var stress ;
        if (left_total == 0 && right_total == 0) {
            displayFootImage();
            $('#stressTable').css('display', 'none');
            stressValueFlag = false;
        } else {
            var counter = 0;
            for (var i = 0; i < leftStress.length; i++) {
                stress = leftStress[i];
                stressArray[counter] = parseInt(stress);
                counter++;
            }
            for (var i = 0; i < rightStress.length; i++) {
                stress = rightStress[i];
                stressArray[counter] = parseInt(stress);
                counter++;
            }
    
    
            // for parse we have array stressArray as two array(left and right) in an array
            var i,j,temparray,chunk = 8; // 8 for each left and right
            for (i=0,j=stressBBSAH.length; i<j; i+=chunk) {
                temparray = stressBBSAH.slice(i,i+chunk);
                stressParseArray.push(temparray); // pushing 2 arrays in one array i,e; left and right array in one array
            }
            displayStressTable(stressArray);
            // displayStressMap(stressArray);
           displayLocalMap(stressArray);
    
        }
    
        //Body balance
        balance = (right_total * 100) / ((left_total == 0) ? 1 : left_total); // find balance
        balance = ((right_total == 0) && (left_total == 0)) ? 100 : balance;
        bodyBalance(balance);

    
    }
    function displayHeatMap(){
        leftStressGrid=LocalData[i].leftStressGrid
        var json = `[${leftStressGrid}]`;
        rightStressGrid=LocalData[i].rightStressGrid
        var data = JSON.parse(json);
        console.log(data)
        var json = `[${rightStressGrid}]`;
        var data2 = JSON.parse(json);
            var max_value = 9;
    
        // This function converts a 0->max_value number to a rgb string for the heatmap
        function get_rgba(d) {
        var ratio = 2 * (d/max_value)
        var r = Math.floor(Math.max(0, 255*(ratio - 1)))
        var b = Math.floor(Math.max(0, 255*(1 - ratio)))
        var g = 255 - b - r
        var a =ratio
        return "rgba(" + r + "," + g + "," + b + "," + a+ ")";
      }
    
    
        var svg = d3.select(".output").append("svg")
        var svg2 = d3.select(".output2").append("svg")
    
        
        var selection = svg.selectAll("rect")
        // <!-- .style("opacity", 0.8) -->
        .data(data)
        var selection2 = svg2.selectAll("rect")
        // <!-- .style("opacity", 0.8) -->
        .data(data2)
        var cellsize = 28;
    
        var x_dim = 7;
        
    
    
        selection.enter().append("rect")
        .attr("x", function(d,i) { return (i%x_dim)*cellsize; })
        .attr("y", function(d,i) { return (Math.floor(i/x_dim))*cellsize; })
        .attr("width", cellsize)
        .attr("height", cellsize)
        .style("fill", function(d) {return get_rgba(d);})
    
          
        selection2.enter().append("rect")
        .attr("x", function(d,i) { return (i%x_dim)*cellsize; })
        .attr("y", function(d,i) { return (Math.floor(i/x_dim))*cellsize; })
        .attr("width", cellsize)
        .attr("height", cellsize)
        .style("fill", function(d) {return get_rgba(d);})
        }
    
    

bootbox.setDefaults({
    animate: false
});


function showSummary(id) {
    var query = new Parse.Query("Activity");
    if(id=="activityId"){
        var actId = sessionStorage.getItem("viewActivityId");
        query.equalTo("activityId", actId);
    }else{ 
        
        query.equalTo("userId", id);
    }
    query.equalTo("status", "COMPLETED");
    query.descending("completionDateTime");
    query.limit(1);
    query.find({
        success: function (activityObject) { //run query for latest activity
            activityId = activityObject[0].get('activityId');
            name = activityObject[0].get('customerName');
            activity = activityObject[0].get('activityMode');
            dates = activityObject[0].get('completionDateTime');
            countStrike = activityObject[0].get('countStrike');
            lengthRateGCT = activityObject[0].get('lengthRateGCT');
            stressBBSAH = activityObject[0].get('stressBBSAH');
            stressF1F2MAH1H2T1T2 = activityObject[0].get('stressF1F2MAH1H2T1T2');
            customerEmail = activityObject[0].get('customerEmail');
            shoeRecommendation = activityObject[0].get('shoeRecommendation');
            totalTime = activityObject[0].get('totalTimeStamp');
            userId = activityObject[0].get('userId');


            //Analysis Mode
            if (activity == undefined || activity.length <= 0) {
                $('#activityRow').css('display', 'none');
            } else {
                $('#activity').text(activity);
            }
            if( activity == "STAND"){
                $('#totalSteps').css('display', 'none');
                $('#totalStrideRate').css('display', 'none');
                $('#totalStrideLength').css('display', 'none');
                $('#totalGCT').css('display', 'none');
                $('#totalStrike').css('display', 'none');
                $('#totalOverStride').css('display', 'none');

                $('#duration').addClass("col-sm-offset-4");
                $('#totalOverPronate').addClass("col-md-offset-2");
                $('#totalBalance').addClass("col-md-offset-2");
            }

            //Customer Name
            if (name == undefined || name == "undefined" || name.length <= 0) {
                //$('#user-name').css('display','none');
                $('#user').css('display', 'none');
                $('#userIfLogo').css("display","none");
                name = "";
            } else {
                if(logo == true){
                    $('#userIfLogo').text("Patient's name: "+name);
                } else{
                    $('#user').text(name + "'s");
                }
            }

               var User = Parse.Object.extend("_User");
               var userQuery = new Parse.Query(User);
               userQuery.equalTo("objectId", userId);
               userQuery.first({
                               success : function(userObj) {
                               drName = userObj.get('name');
                               },
                               error : function(error) {
                               console.log("Error: " + error.code + " " + error.message);
                               }
                               });

            //Date
            date = (dates.toDateString()).split(' ');
            dates = date[1] + ' ' + date[2] + ', ' + date[3]
            $('#assessment-date').text(dates);

            //Duration
            var min = Math.floor(totalTime / 60);
            var sec = (totalTime % 60).toFixed(0);
            $('#min').text(min);
            $('#sec').text(sec);

            //Step Count
            rightTotalCount = countStrike[1][0]; // right stepCount
            leftTotalCount = countStrike[0][0]; //left stepCount
            totalStep = rightTotalCount + leftTotalCount;
            console.log(totalStep);
            if (totalStep != 0) {
                $('#stepCountLeft').text(totalStep);
            } else {
                //$('#totalSteps').css('display','none');
                stepCountFlag = false;
            }

            //Stride Rate
            strideRateLeft = lengthRateGCT[0][1];	//stride rate
            strideRateRight = lengthRateGCT[1][1];
            if (strideRateLeft == 0 && strideRateRight == 0) {
                //$('#totalStrideRate').css('display','none');
                strideRateFlag = false;
            } else {
                //avgStrideRate= parseInt((strideRateLeft+strideRateRight)/2);
                if (strideRateLeft == 0) {
                    avgStrideRate = strideRateRight;
                } else if (strideRateRight == 0) {
                    avgStrideRate = strideRateLeft;
                } else {
                    avgStrideRate = strideRateLeft;
                }
                $('#avgStrideRate').text(avgStrideRate);
            }

            //Stride Length
            strideLengthLeft = lengthRateGCT[0][0]; //stride length
            strideLengthRight = lengthRateGCT[1][0];
            if (strideLengthLeft == 0 && strideLengthRight == 0) {
                //$('#totalStrideLength').css('display','none');
                stridelengthFlag = false;
            } else {
                if (strideLengthLeft == 0) {
                    //$('.strideLeftDisplay').css('display','none');
                    //$('.strideRightDisplay').css('float','none');
                } else {
                    $('#strideLengthLeft').text(strideLengthLeft);
                }
                if (strideLengthRight == 0) {
                    //$('.strideRightDisplay').css('display','none');
                    //$('.strideLeftDisplay').css('float','none');
                } else {
                    $('#strideLengthRight').text(strideLengthRight);
                }
            }

            //GCT
            gctLeft = lengthRateGCT[0][2];   //gct s
            gctRight = lengthRateGCT[1][2];
            if (gctLeft == 0 && gctRight == 0) {
                //$('#totalGCT').css('display','none');
                gCTFlag = false;
            } else {
                if (gctLeft == 0) {
                    //$('.gctLeftDisplay').css('display','none');
                    //$('.gctRightDisplay').css('float','none');
                } else {
                    $('#gctLeft').text(gctLeft);
                }
                if (gctRight == 0) {
                    //$('.gctRightDisplay').css('display','none');
                    //$('.gctLeftDisplay').css('float','none');
                } else {
                    $('#gctRight').text(gctRight);
                }
            }

            $(".loader").fadeOut(500);
            //Strike Distribution
            // Fetch Left Foot Strike
            leftHeelCount = countStrike[0][1];
            leftMidCount = countStrike[0][2];
            leftFrontCount = countStrike[0][3];
            leftTotal = leftFrontCount + leftMidCount + leftHeelCount;
            // Fetch Right Foot Strike
            rightHeelCount = countStrike[1][1];
            rightMidCount = countStrike[1][2];
            rightFrontCount = countStrike[1][3];
            rightTotal = rightFrontCount + rightMidCount + rightHeelCount;
            if ((rightTotal == 0) && (leftTotal == 0)) {
                $('#totalStrike').css('display', 'none');
                strikeDistributionFlag = false;
            } else {
                if (leftTotal !== 0) {
                    leftFrontCount /= leftTotal;
                    leftMidCount /= leftTotal;
                    leftHeelCount /= leftTotal;
                    leftFrontCount = Math.round(leftFrontCount * 100) / 1;
                    leftMidCount = Math.round(leftMidCount * 100) / 1;
                    leftHeelCount = Math.round(leftHeelCount * 100) / 1;
                    leftStrikeDonut(leftFrontCount, leftMidCount, leftHeelCount); //left strike donut
                } else {
                    $('#leftStrike').css('display', 'none');
                }
                if (rightTotal !== 0) {
                    rightFrontCount /= rightTotal;
                    rightMidCount /= rightTotal;
                    rightHeelCount /= rightTotal;
                    rightFrontCount = Math.round(rightFrontCount * 100) / 1;
                    rightMidCount = Math.round(rightMidCount * 100) / 1;
                    rightHeelCount = Math.round(rightHeelCount * 100) / 1;
                    rightStrikeDonut(rightFrontCount, rightMidCount, rightHeelCount); //right strike donut
                } else {
                    $('#rightStrike').css('display', 'none');
                }
            }

            //Foot Movement
            leftOverPronate = lengthRateGCT[0][3];                //over pronate
            rightOverPronate = lengthRateGCT[1][3];
            leftFootDonut(100 - leftOverPronate, leftOverPronate); // left overpronate donut
            rightFootDonut(100 - rightOverPronate, rightOverPronate);// right overpronate donut
            //if (totalStep == 0) {
            //    $('#totalOverPronate').css('display', 'none');
                //footMovementFlag = false;
            //}

            // Over Stride
            leftOverStride = lengthRateGCT[0][4];
            rightOverStride = lengthRateGCT[1][4];
            console.log(leftOverStride);
            leftOverStrideDonut(100 - leftOverStride, leftOverStride); //left over stride donut
            rightOverStrideDonut(100 - rightOverStride, rightOverStride); //right over stride donut
            if (totalStep == 0) {
                $('#totalOverStride').css('display', 'none');
                overStrideFlag = false;
            }

            // Stress Map & load Distribution
            console.log(stressBBSAH);
            console.log(stressF1F2MAH1H2T1T2);            
            if(stressF1F2MAH1H2T1T2 == undefined){
                stressBBSAH[0][5] = 0; stressBBSAH[0][6] = 0; stressBBSAH[0][7] = 0; stressBBSAH[1][5] = 0; stressBBSAH[1][6] = 0; stressBBSAH[1][7] = 0; // doing this to maintain backward compatibility.
                var left_total = stressBBSAH[0][0] + stressBBSAH[0][1] + stressBBSAH[0][2] + stressBBSAH[0][3] + stressBBSAH[0][4] + stressBBSAH[0][5] + stressBBSAH[0][6] + stressBBSAH[0][7] ;
                var right_total = stressBBSAH[1][0] + stressBBSAH[1][1] + stressBBSAH[1][2] + stressBBSAH[1][3] + stressBBSAH[1][4] + stressBBSAH[1][5] + stressBBSAH[1][6] + stressBBSAH[1][7];
                right_total = (right_total == 0) ? left_total : right_total;
                left_total = (left_total == 0) ? right_total : left_total;
                if (left_total == 0 && right_total == 0) {
                    $('#stressTable').css('display', 'none');
                    displayFootImage(); // function called to just show both the foots even if there is no stride data.
                    stressValueFlag = false;
                } else {
                    var counter = 0;
                    for (var i = 0; i < stressBBSAH.length; i++) {
                        for (var j = 0; j < 8; j++) {
                            stress = stressBBSAH[i][j];
                            stressArray[counter] = parseInt(stress);
                            counter++;
                        }
                    }
                    stressParseArray = stressBBSAH;
                    window.localStorage.setItem('avgStride',JSON.stringify(stressArray));

                   // displayStressMap(stressArray);
                    displayMap(stressArray);
                    displayStressTable(stressArray);
                }
            } else{
                left_total = stressF1F2MAH1H2T1T2[0][0] + stressF1F2MAH1H2T1T2[0][1] + stressF1F2MAH1H2T1T2[0][2] + stressF1F2MAH1H2T1T2[0][3] + stressF1F2MAH1H2T1T2[0][4] + stressF1F2MAH1H2T1T2[0][5] + stressF1F2MAH1H2T1T2[0][6] + stressF1F2MAH1H2T1T2[0][7] ;
                right_total = stressF1F2MAH1H2T1T2[1][0] + stressF1F2MAH1H2T1T2[1][1] + stressF1F2MAH1H2T1T2[1][2] + stressF1F2MAH1H2T1T2[1][3] + stressF1F2MAH1H2T1T2[1][4] + stressF1F2MAH1H2T1T2[1][5] + stressF1F2MAH1H2T1T2[1][6] + stressF1F2MAH1H2T1T2[1][7];
                right_total = (right_total == 0) ? left_total : right_total;
                left_total = (left_total == 0) ? right_total : left_total;
                if (left_total == 0 && right_total == 0) {
                    $('#stressTable').css('display', 'none');
                    displayFootImage(); // function called to just show both the foots even if there is no stride data.
                    stressValueFlag = false;
                } else {
                    var counter = 0;
                    for (var i = 0; i < stressF1F2MAH1H2T1T2.length; i++) {
                        for (var j = 0; j < 8; j++) {
                            stress = stressF1F2MAH1H2T1T2[i][j];
                            stressArray[counter] = parseInt(stress);
                            counter++;
                        }
                    }
                    stressParseArray = stressF1F2MAH1H2T1T2;
                    window.localStorage.setItem('avgStride',JSON.stringify(stressArray));
                   // displayStressMap(stressArray);
                   displayMap(stressArray);
                    displayStressTable(stressArray);
                }
            }
               // code for the "ACTION REPLAY" feature in INSIGHT - 13/12/18 11:03AM
               $(function(totalTime) {
                 var stridesQuery = new Parse.Query("StrideInfo");
                 stridesQuery.equalTo("userId", userId);
                 stridesQuery.equalTo("activityId", activityId);
                 stridesQuery.find({
                                   success: function(strides){
                                   window.localStorage.setItem('strides',JSON.stringify(strides));
                                   console.log("Strides are now stored in localstorage");
                                   },
                                   error: function(err){
                                   console.log(err);
                                   }
                                   });
                 });
            //Body balance
            balance = (right_total * 100) / ((left_total == 0) ? 1 : left_total); // find balance
            balance = ((right_total == 0) && (left_total == 0)) ? 100 : balance;
            bodyBalance(balance);
        }
    });
   
}
//fetchLocalData(LocalData)
function arrayMin(Array){
    return Math.min.apply(Math,Array);
}

function stepFlag(){
    stepCountFlag = false;
}

function strideFlag(){
    strideRateFlag = false;
}

function strideLenFlag(){
    stridelengthFlag = false;
}

function gctFlag(){
    gCTFlag = false;
}

function footFlag(){
    footMovementFlag = false;
}

function strikeDistFlag(){
    strikeDistributionFlag = false;
}

function overStrFlag() {
    overStrideFlag = false;
}

function bodyBalFlag(){
    bodyBalanceFlag = false;
}

function stressMap(){
    stressMapFlag = false;
}

function stressValue(){
    stressValueFlag = false;
}

function tableFlag(){
    tableMapFlag = false;
}

function feedbackFlag(){
    feedbackOneFlag = false;
}

function leftFootDonut(normal,leftOverPronate){
 var morrisLeftFootDonut= Morris.Donut({
        element: 'foot-left',
        data: [
            {label: "Normal ", value: normal},
            {label: "Over Pronate",value: leftOverPronate}

        ],
        gridTextSize: '23',
        hideHover: 'auto',
        gridTextFamily:'"Raleway" , sans-serif',
        resize: false,

        formatter: function (y) { return y + "%" }

    });
    var valLeftFootDonutArray=[normal,leftOverPronate];
    morrisLeftFootDonut.select(1);
}

function rightFootDonut(normal, rightOverPronate){
    var morrisrightFootDonut = Morris.Donut({
       element: 'foot-right',
       data: [
       {label: "Normal ", value: normal},
       {label: "Over Pronate",value: rightOverPronate},
                                                   
        ],
         gridTextSize: '23',
         hideHover: 'auto',
         gridTextFamily:'"Raleway" , sans-serif',
          resize: false,
          formatter: function (y) { return y + "%" }
      });
    var valrRightFootDonutArray = [normal, rightOverPronate];
    morrisrightFootDonut.select(1);
}

function leftOverStrideDonut(normal,leftOverStride){
    var morrisleftOverStrideDonut = Morris.Donut({
       element: 'overstride-left',
       data: [
         {label: "Normal ", value: normal},
          {label: "Overstride",value: leftOverStride},
                                                        
          ],
           gridTextSize: '23',
           hideHover: 'auto',
           gridTextFamily:'"Raleway" , sans-serif',
           resize: false,
                                                 
           formatter: function (y) { return y + "%" }
         });
    var valrLeftOverStrideDonutArray = [normal, leftOverStride];
    morrisleftOverStrideDonut.select(1);
}

function rightOverStrideDonut(normal,rightOverStride){
    var morrisrightOverStrideDonut = Morris.Donut({
        element: 'overstride-right',
        data: [
        {label: "Normal ", value: normal},
         {label: "Overstride",value: rightOverStride},
         ],
         gridTextSize: '23',
         hideHover: 'auto',
         gridTextFamily:'"Raleway" , sans-serif',
         resize: false,
                                                  
         formatter: function (y) { return y + "%" }
                                                  
      });
    var valrRightOverStrideDonutArray = [normal, rightOverStride];
    morrisrightOverStrideDonut.select(1);
}

function leftStrikeDonut(front,mid,heel){
    Morris.Donut({
        element: 'strike-left',
        data: [
            {label: "Front ", value: front},
            {label: "Mid ", value: mid},
            {label: "Heel ", value: heel}
        ],
        gridTextSize: '23',
        hideHover: 'auto',
        gridTextFamily:'"Raleway" , sans-serif',
        resize: false,

        formatter: function (y) { return y + "%" }
        //colors:['#FF0000',"#00FF00","#FFFF00"],
    });
}

function rightStrikeDonut(front,mid,heel){
    Morris.Donut({
        element: 'strike-right',
        data: [
            {label: "Front ", value: front},
            {label: "Mid ", value: mid},
            {label: "Heel ", value: heel}
        ],
        gridTextSize: '23',
        hideHover: 'auto',
        gridTextFamily:'"Raleway" , sans-serif',
        resize: false,

        formatter: function (y) { return y + "%" }
        //colors:['#FF0000',"#00FF00","#FFFF00"],
    });
}

function bodyBalance(balance){
    $('#balanceVal').text(balance);
    if ((balance >= 99) && (balance <= 101)) {
        var balancemessage ="Left & Right well-balanced";
        $('#balance_text').text( balancemessage );
        document.getElementById('balance-img').classList.add('balance-green');
    } else if ((balance < 99) && (balance >= 95)) {
        var balancemessage ="OverLoading on LEFT";
        $('#balance_text').text(balancemessage );
        document.getElementById('balance-img').classList.add('balance-yellow');
    } else if (balance < 95) {
        var balancemessage ="OverLoading on LEFT";
        $('#balance_text').text(balancemessage );
        document.getElementById('balance-img').classList.add('balance-red');
        balance = 92;
    } else if ((balance <= 105) && (balance > 101)) {
        var balancemessage ="OverLoading on RIGHT";
        $('#balance_text').text(balancemessage );
        document.getElementById('balance-img').classList.add('balance-yellow-flip');
    } else if (balance > 105) {
        var balancemessage ="OverLoading on RIGHT";
        $('#balance_text').text(balancemessage );
        document.getElementById('balance-img').classList.add('balance-red-flip');
        balance = 108;
    }
    var overLoad_value=(balance>100)?(balance-100):(100-balance);
    overLoad_value = Math.floor(overLoad_value);

    if(overLoad_value!=0){
        $('#balance_val').text(overLoad_value+'% ');
    }
}

//for localization of the stressTable 
// String.locale is global variable 
colDatas = {"ja": ["左","右"], "pt":["Esquerda","Certo"], "zh":["剩下","对"]};
firstRows = {"ja": ["つま先","前足","ミッドソール","ヒール"], "pt":["Dedo do pé","Antepé","Entressola","Salto"], "zh": ["脚趾","前脚","中底","脚跟"]};
currentLang = String.locale.split("-");

function displayStressTable(stressArray){
    var stressValues = [];
    console.log(stressArray.length);
    if(stressArray.length==0){
        $('#stressTable').css('display','none');
    }else{ 
        var leftForefoot = parseFloat((stressArray[0] + stressArray[1]).toFixed(1)); 
        var leftMidsole= parseFloat((stressArray[2] + stressArray[3]).toFixed(1));
        var leftHeel = parseFloat((stressArray[4] + stressArray[5]).toFixed(1));
        var leftToe = parseFloat(( stressArray[6] + stressArray[7]).toFixed(1));

        var rightForefoot = parseFloat((stressArray[8] + stressArray[9]).toFixed(1));         
        var rightMidsole = parseFloat((stressArray[10] + stressArray[11]).toFixed(1));
        var rightHeel = parseFloat((stressArray[12] + stressArray[13]).toFixed(1));
        var rightToe = parseFloat((stressArray[14] + stressArray[15]).toFixed(1));

        var totalLeft = leftForefoot + leftMidsole + leftHeel + leftToe ;
        var totalRight = rightForefoot + rightMidsole + rightHeel + rightToe;

        var left_forefoot_per = totalLeft>0?(((stressArray[0] + stressArray[1])/totalLeft)*100).toFixed(1):0.0;        
        var left_midsole_per = totalLeft>0?(((stressArray[2] + stressArray[3])/totalLeft)*100).toFixed(1):0.0;
        var left_heel_per = totalLeft>0?(((stressArray[4] + stressArray[5])/totalLeft)*100).toFixed(1):0.0;
        var left_toe_per = totalLeft>0?(((stressArray[6] + stressArray[7])/totalLeft)*100).toFixed(1):0.0;

        var right_forefoot_per = totalRight>0?(((stressArray[8] + stressArray[9])/totalRight)*100).toFixed(1):0.0;        
        var right_midsole_per = totalRight>0?(((stressArray[10] + stressArray[11])/totalRight)*100).toFixed(1):0.0;
        var right_heel_per = totalRight>0?(((stressArray[12] + stressArray[13])/totalRight)*100).toFixed(1):0.0;
        var right_toe_per = totalRight>0?(((stressArray[14] + stressArray[15])/totalRight)*100).toFixed(1):0.0;

        // if($(window).width() > 767){ // for tabs or above
        colDatas = {"ja": ["左","右"], "pt":["Esquerda","Certo"], "zh":["剩下","对"]};
        firstRows = {"ja": ["つま先","前足","ミッドソール","ヒール"], "pt":["Dedo do pé","Antepé","Entressola","Salto"], "zh": ["脚趾","前脚","中底","脚跟"]};
        currentLang = String.locale.split("-");
        
        colData = [];    
        firstRow = [];
        if(currentLang[0] == "en"){
            colData = ["Left","Right"];
            firstRow = ["Toe","Forefoot","Midsole","Heel"];
        } else{
            // String.locale is global variable which is set in report.html file
            colData = colDatas[currentLang[0]];
            firstRow = firstRows[currentLang[0]];
        }
        stressValues.push([firstRow[0], firstRow[1], firstRow[2], firstRow[3], firstRow[4], firstRow[5], firstRow[6], firstRow[7]]);
        stressValues.push([[leftToe,rightToe],[leftForefoot,rightForefoot],[leftMidsole,rightMidsole],[leftHeel, rightHeel]]);
        stressValues.push([[left_toe_per, right_toe_per], [left_forefoot_per, right_forefoot_per], [left_midsole_per, right_midsole_per], [left_heel_per, right_heel_per]]);
        
        var data = {"Cols": colData, "Rows": stressValues};
        console.log("stress vals");
        console.log(data.Rows);

        var table = document.createElement('table');
        table.setAttribute("class", "table");
        table.setAttribute("cellspacing", "0");
        table.setAttribute("id", "stressTable");
        table.setAttribute("table-layout", "fixed");
        table.setAttribute("width", "100%");
        table.setAttribute("text-align", "center");

        var tr = document.createElement('tr');
        tr.setAttribute('style','color: #000;');
        for (var i=0; i< data.Cols.length; i++){ // column
            tr.setAttribute("font-family","Oswald, sans-serif");
            $(tr).append('<td colspan="2" style="border: 0px; margin: 0px; text-align: center;line-height: 2;font-size: 20px;  opacity: 1; padding: 0px; padding-right: 15px;">'+data.Cols[i]+'</td>');
        }
        $(table).append(tr);
        for(var r=0; r < 5; r++){   // row
            var tr = document.createElement('tr');
            if(r%2!=0){
                tr.setAttribute('style',  'background-color: #f2f2f2; border-bottom: 1px solid #ddd ;');
            }else{
                tr.setAttribute('style',  'background-color: #fff; border-bottom: 1px solid #ddd ;');
            }

            if(r!=4){
                for(var c=0; c < 4 ; c++){
                    if(c%2==0){
                        // its column 1 or 3
                        $(tr).append('<td style="text-align: left;color: #333;font-size:18px;padding: 6px; ">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ' +data.Rows[0][r] +'</td>');
                        
                    } else{
                        // its column 2 or 4
                        if(c==1){
                            $(tr).append('<td style="text-align: left;color: #333;font-size:18px;padding: 6px; ">'+data.Rows[1][r][0] +'kg ('+ data.Rows[2][r][0] +'%)'+'</td>');
                        } else{
                            $(tr).append('<td style="text-align: left;color: #333;font-size:18px;padding: 6px; ">'+data.Rows[1][r][1] +'kg ('+ data.Rows[2][r][1] +'%)'+'</td>');
                        }
                    }
                }    
            }else{
                for(c=0; c<4;c++){
                    if(c==0){$(tr).append('<td style="text-align: left;color: #333;font-size:20px;padding: 6px; ">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Total </td>');}
                    else if(c==1){$(tr).append('<td style="text-align: left;color: #333;font-size:20px;padding: 6px; ">'+totalLeft +'kg</td>');}
                    else if(c==2){$(tr).append('<td style="text-align: left;color: #333;font-size:20px;padding: 6px; "></td>');}
                    else if(c==3){$(tr).append('<td style="text-align: left;color: #333;font-size:20px;padding: 6px; ">'+totalRight +'kg</td>');}
                    
                }
            }
            $(table).append(tr);
        }
        var center = document.createElement('center');
        $(center).append(table);
        $('#showTable').append(center);
    }
}
function displayMap(){
    displayStressMap(stressArray);
    document.getElementById("heatmap").style.display = "none";



}
function displayLocalMap(){
    if (LocalData.leftStressGrid==undefined){
        displayStressMap(stressArray);
        
        
        document.getElementById("heatmap").style.display = "none";
        //document.getElementById("heatmap").attr=true;
    }else{
        displayHeatMap();
        document.getElementById("stressmap").style.display = "none";
        
    }
}

function displayStressMap(stressBSAHK) {
    // for loading the 
    if($(window).width() < 768){
        $('#canvas1').attr('width','140');
        $('#canvas1').attr('height','366');
        $('#canvas2').attr('width','140');
        $('#canvas2').attr('height','366');
    }else{
        $('#canvas1').attr('width','210');
        $('#canvas1').attr('height','549');
        $('#canvas2').attr('width','210');
        $('#canvas2').attr('height','549');
    }

    // Loading the Canvas with image for Left Foot
    var foot_canvas_l = document.getElementById('canvas1');
    foot_ctx_l = foot_canvas_l.getContext('2d');
    foot_img_l = new Image();
    foot_ctx_l.globalAlpha = 0.7;
    foot_img_l.onload = function () {
        if($(window).width() < 768){
            foot_ctx_l.drawImage(foot_img_l, 0, 0, 140, 366, 0, 0, 140, 366);
        }else{
            foot_ctx_l.drawImage(foot_img_l, 0, 0, 140, 366, 0, 0, 210, 549);
        }
    };
    foot_img_l.src = "img/foot_lt.png";

    // Empty array
    data = [];


    // Applying stress maps to the canvas images
    //var heat_lf, heat_rf;
    heat_lf = simpleheat('canvas1').data(data).max(2);
    heat_rf = simpleheat('canvas2').data(data).max(2);


    // Loading the Canvas with image for Right Foot
    var foot_canvas_r = document.getElementById('canvas2');
    foot_ctx_r = foot_canvas_r.getContext('2d');
    foot_img_r = new Image();
    foot_ctx_r.globalAlpha = 0.7;
    foot_img_r.onload = function () {
        if($(window).width() < 768){
            foot_ctx_r.drawImage(foot_img_r, 0, 0, 140, 366, 0, 0, 140, 366);
        }else{
            foot_ctx_r.drawImage(foot_img_r, 0, 0, 140, 366, 0, 0, 210, 549);
        }
    };
    foot_img_r.src = "img/foot_rt.png";
    
    // Identifying browser name and applying radius and blur values to the browser
    navigator.sayswho= (function(){
                        var N= navigator.appName, ua= navigator.userAgent, tem;
                        var M= ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
                        if(M && (tem= ua.match(/version\/([\.\d]+)/i))!= null) M[2]= tem[1];
                        M= M? [M[1], M[2]]: [N, navigator.appVersion,'-?'];
                        return M;
                        })();
    //Radius and Blur is (screen_width > 768) === (screen_width < 768) * 1.5
    if (navigator.sayswho[0] === "Chrome") {
        // Browsers like chrome, safari which supports web-kit packages applies radius 20 and blur 55 as parameters	for stress maps

        if($(window).width() < 768){
            heat_lf.radius(16, 47);
            heat_rf.radius(16, 47);
            //heat_rf.radius(20, 35);
        }else{
            heat_lf.radius(24, 70);
            heat_rf.radius(24, 70);
            //heat_rf.radius(30, 52);
        }
    }
    else if (navigator.sayswho[0] === "Firefox") {
        // Firefox and its compatitable browsers applies with radius 20 and blur 30 as parameters for stress maps
        if($(window).width() < 768){
            heat_lf.radius(16, 27);
            heat_rf.radius(16, 27);
        }else{
            heat_lf.radius(24, 40);
            heat_rf.radius(24, 40);
        }
    }
    else {
        // Other browsers are applied with radius 20 and blur 40 as parameters for stress maps
        if($(window).width() < 768){
            heat_lf.radius(16, 28);
            heat_rf.radius(16, 28);
        }else{
            heat_lf.radius(24, 42);
            heat_rf.radius(24, 42);
        }
    }


    // By Default we are applying heatmaps to the canvas images for Left Foot
    heat_lf.draw();
    heat_lf.clear(data);
    heat_lf.clearContext();
    //G Comment
    // foot_ctx_l.drawImage(foot_img_l, 0, 0);

    //G Comment
    // foot_img_l.src = "img/foot_lt.png";

    // By Default we are applying heatmaps to the canvas images for Right Foot
    heat_rf.draw();
    heat_rf.clear(data);
    heat_rf.clearContext();
    //G Comment
    // foot_ctx_r.drawImage(foot_img_r, 0, 0);
    // foot_img_r.src = "img/foot_rt.png";

    process(stressBSAHK);
}


function colorValue(stressVal){
    //
    var incrementFactor = 0;
        if(stressVal<1){
            incrementFactor = 0;
        }else if (stressVal >= 1 && stressVal < 2) {
            incrementFactor = 1;
        }else if (stressVal >= 2 && stressVal < 6) {
            incrementFactor = 2;
        }else if (stressVal >= 6 && stressVal < 12) {
            incrementFactor = 3;
        }else if (stressVal >= 12 && stressVal < 16) {
            incrementFactor = 4;
        }else if (stressVal >= 16 && stressVal < 20) {
            incrementFactor = 5;
        }else if (stressVal >= 20 && stressVal < 24) {
            incrementFactor = 6;
        }else if (stressVal >= 24 && stressVal < 28) {
            incrementFactor = 7;
        }else if (stressVal >= 28 && stressVal < 32) {
            incrementFactor = 8;
        }else{
            incrementFactor = 9;
        }
    return incrementFactor;
}

function process(stressBSAHK){

    for(var i=0; i<stressBSAHK.length; i++){
        stressBSAHK[i] = (stressBSAHK[i] < 0 ) ? 0 : (stressBSAHK[i] > 200 ) ? 200 : stressBSAHK[i];
    }

    // Creating animation
    var i = 0;
    // var foot1_inc = [0,0], foot2_inc = [0,0], footMid_inc = [0,0], side_inc = [0,0], arch_inc = [0,0], heel_inc = [0,0];
    var foot1_inc = [0,0], foot2_inc = [0,0], footMid_inc = [0,0], side_inc = [0,0], arch_inc = [0,0], heel1_inc = [0,0], heel2_inc = [0,0], toe1_inc = [0,0], toe2_inc = [0,0];

    foot1_inc[0] = colorValue(stressBSAHK[0]);
    foot2_inc[0] = colorValue(stressBSAHK[1]);
    footMid_inc[0] = colorValue(stressBSAHK[0]+stressBSAHK[1]);
    side_inc[0] = colorValue(stressBSAHK[2]);
    arch_inc[0] = colorValue(stressBSAHK[3]);
    heel1_inc[0] = colorValue(stressBSAHK[4]);
    heel2_inc[0] = colorValue(stressBSAHK[5]);
    toe1_inc[0] =  colorValue(stressBSAHK[6]);
    toe2_inc[0] =  colorValue(stressBSAHK[7]);

    foot1_inc[1] = colorValue(stressBSAHK[8]);
    foot2_inc[1] = colorValue(stressBSAHK[9]);
    footMid_inc[1] = colorValue(stressBSAHK[8]+stressBSAHK[9]);
    side_inc[1] = colorValue(stressBSAHK[10]);
    arch_inc[1] = colorValue(stressBSAHK[11]);
    heel1_inc[1] = colorValue(stressBSAHK[12]);
    heel2_inc[1] = colorValue(stressBSAHK[13]);
    toe1_inc[1] =  colorValue(stressBSAHK[14]);
    toe2_inc[1] =  colorValue(stressBSAHK[15]);

    //All points (screen_width > 768) === (screen_width < 768)*1.5

    //Left Foot
    if($(window).width() < 768){
        //F1
        for (var k = 0; k < foot1_inc[0]; k++) {
            heat_lf.add([103.3, 100, 1]);
        }
        for (var k = 0; k < foot1_inc[0]; k++) {
            heat_lf.add([89.3, 120, 1]);
        }
        //F1+F2
        for (var k = 0; k < footMid_inc[0]; k++) {
            heat_lf.add([70.6, 126.6, 1]);
        }
        //F2
        for (var k = 0; k < foot2_inc[0]; k++) {
            heat_lf.add([34.6, 133.3, 1]);
        }
        for (var k = 0; k < foot2_inc[0]; k++) {
            heat_lf.add([42.6, 157.3, 1]);
        }
        //S
        for (var k = 0; k < side_inc[0]; k++) {
            heat_lf.add([32, 203.3, 1]);
        }
        for (var k = 0; k < side_inc[0]; k++) {
            heat_lf.add([36, 248, 1]);
        }

        //A
        for (var k = 0; k < arch_inc[0]; k++) {
            heat_lf.add([77.3, 173.3, 1]);
        }
        for (var k = 0; k < arch_inc[0]; k++) {
            heat_lf.add([68, 206.6, 1]);
        }
        for (var k = 0; k < arch_inc[0]; k++) {
            heat_lf.add([64, 240, 1]);
        }

        //H1
        for (var k = 0; k < heel1_inc[0]; k++) {
            heat_lf.add([36, 328, 1]);
        }
        for (var k = 0; k < heel1_inc[0]; k++) {
            heat_lf.add([57.3, 328, 1]);
        }
        for (var k = 0; k < heel1_inc[0]; k++) {
            heat_lf.add([42.6, 294.6, 1]);
        }

        //H2
        for (var k = 0; k < heel2_inc[0]; k++) {
            heat_lf.add([60, 310, 1]);
        }

        //T1
        // for (var k = 0; k < toe1_inc[0]; k++) {
        //     heat_lf.add([36, 328, 1]);
        // }
        for (var k = 0; k < toe1_inc[0]; k++) {
            heat_lf.add([120, 40, 1]);
        }
        // for (var k = 0; k < toe1_inc[0]; k++) {
        //     heat_lf.add([42.6, 294.6, 1]);
        // }

        //T2
        for (var k = 0; k < toe2_inc[0]; k++) {
            heat_lf.add([38.7, 80, 1]);
        }
        // for (var k = 0; k < toe2_inc[0]; k++) {
        //     heat_lf.add([57.3, 328, 1]);
        // }
        // for (var k = 0; k < toe2_inc[0]; k++) {
        //     heat_lf.add([42.6, 294.6, 1]);
        // }
    }else{

        //F1
        for (var k = 0; k < foot1_inc[0]; k++) {
            heat_lf.add([155, 150, 1]);
        }
        for (var k = 0; k < foot1_inc[0]; k++) {
            heat_lf.add([134, 180, 1]);
        }
        //F1+F2
        for (var k = 0; k < footMid_inc[0]; k++) {
            heat_lf.add([106, 190, 1]);
        }
        //F2
        for (var k = 0; k < foot2_inc[0]; k++) {
            heat_lf.add([52, 200, 1]);
        }
        for (var k = 0; k < foot2_inc[0]; k++) {
            heat_lf.add([64, 236, 1]);
        }

        //S
        for (var k = 0; k < side_inc[0]; k++) {
            heat_lf.add([48, 314, 1]);
        }
        for (var k = 0; k < side_inc[0]; k++) {
            heat_lf.add([54, 372, 1]);
        }

        //A
        for (var k = 0; k < arch_inc[0]; k++) {
            heat_lf.add([116, 260, 1]);
        }
        for (var k = 0; k < arch_inc[0]; k++) {
            heat_lf.add([102, 310, 1]);
        }
        for (var k = 0; k < arch_inc[0]-1; k++) {
            heat_lf.add([96, 360, 1]);
        }

        //H1
        for (var k = 0; k < heel1_inc[0]; k++) {
            heat_lf.add([54, 492, 1]);
        }
        for (var k = 0; k < heel1_inc[0]; k++) {
            heat_lf.add([86, 492, 1]);
        }
        for (var k = 0; k < heel1_inc[0]; k++) {
            heat_lf.add([64, 442, 1]);
        }

        //H2
        for (var k = 0; k < heel2_inc[0]; k++) {
            heat_lf.add([90, 465, 1]);
        }

        //T1
        // for (var k = 0; k < 0; k++) {
        //     heat_lf.add([180, 40, 1]);
        // } 
        for (var k = 0; k < toe1_inc[0]; k++) {
            heat_lf.add([180, 60, 1]);
        } 
        // for (var k = 0; k < 0; k++) {
        //     heat_lf.add([180, 90, 1]);
        // }  
        
        //T2
        for (var k = 0; k < toe2_inc[0]; k++) {
            heat_lf.add([58, 120, 1]);
        } 
        // for (var k = 0; k < toe2_inc[0]; k++) {
        //     heat_lf.add([180, 50, 1]);
        // } 
        // for (var k = 0; k < toe2_inc[0]; k++) {
        //     heat_lf.add([180, 90, 1]);
        // } 
    }

    // Clearing the previous animation and drawing new animation in canvas image for left foot and left knee
    heat_lf.draw();
    heat_lf.clear(data);
    heat_lf.clearContext();
//    foot_ctx_l.drawImage(foot_img_l, 0, 0);
    if($(window).width() < 768){
        foot_ctx_l.drawImage(foot_img_l, 0, 0, 140, 366, 0, 0, 140, 366);
    }else{
        foot_ctx_l.drawImage(foot_img_l, 0, 0, 140, 366, 0, 0, 210, 549);
    }
    //heat_lk.draw();
    //heat_lk.clear(data);
    //heat_lk.clearContext();
    //knee_ctx_l.drawImage(knee_img_l, 0, 0);
    //knee_img_l.src = "img/heatmap/knee_lt1.png";

    //G Comment
    // foot_img_l.src = "img/foot_lt.png";

    //Right
    if($(window).width() < 768){
        //F1
        for (var k = 0; k < foot1_inc[1]; k++) {
            heat_rf.add([36.7, 100, 1]);
        }
        for (var k = 0; k < foot1_inc[1]; k++) {
            heat_rf.add([50.7, 120, 1]);
        }
        //F1+F2
        for (var k = 0; k < footMid_inc[1]; k++) {
            heat_rf.add([69.3, 126.6, 1]);
        }
        //F2
        for (var k = 0; k < foot2_inc[1]; k++) {
            heat_rf.add([105.3, 133.3, 1]);
        }
        for (var k = 0; k < foot2_inc[1]; k++) {
            heat_rf.add([97.3, 157.3, 1]);
        }
        //S
        for (var k = 0; k < side_inc[1]; k++) {
            heat_rf.add([108, 203.3, 1]);
        }
        for (var k = 0; k < side_inc[1]; k++) {
            heat_rf.add([104, 248, 1]);
        }

        //A
        for (var k = 0; k < arch_inc[1]; k++) {
            heat_rf.add([62.7, 173.3, 1]);
        }
        for (var k = 0; k < arch_inc[1]; k++) {
            heat_rf.add([72, 206.6, 1]);
        }
        for (var k = 0; k < arch_inc[1]; k++) {
            heat_rf.add([76, 240, 1]);
        }

        //H1
        for (var k = 0; k < heel1_inc[1]; k++) {
            heat_rf.add([104, 328, 1]);
        }
        for (var k = 0; k < heel1_inc[1]; k++) {
            heat_rf.add([82.7, 328, 1]);
        }
        for (var k = 0; k < heel1_inc[1]; k++) {
            heat_rf.add([97.3, 294.6, 1]);
        }
        //H2       
        for (var k = 0; k < heel2_inc[1]; k++) {
            heat_rf.add([80, 310, 1]);
        }
        //T1
        for (var k = 0; k < toe1_inc[1]; k++) {
            heat_rf.add([20, 40, 1]);
        }        
        //T2
        for (var k = 0; k < toe2_inc[1]; k++) {
            heat_rf.add([101.3, 80, 1]);
        }        

    }else{
        //F1
        for (var k = 0; k < foot1_inc[1]; k++) {
            heat_rf.add([55, 150, 1]);
        }
        for (var k = 0; k < foot1_inc[1]; k++) {
            heat_rf.add([76, 180, 1]);
        }
        
        //F1+F2
        for (var k = 0; k < footMid_inc[1]; k++) {
            heat_rf.add([104, 190, 1]);
        }
        
        //F2
        for (var k = 0; k < foot2_inc[1]; k++) {
            heat_rf.add([158, 200, 1]);
        }
        for (var k = 0; k < foot2_inc[1]; k++) {
            heat_rf.add([146, 236, 1]);
        }
        
        //S
        for (var k = 0; k < side_inc[1]; k++) {
            heat_rf.add([162, 314, 1]);
        }
        for (var k = 0; k < side_inc[1]; k++) {
            heat_rf.add([156, 372, 1]);
        }

        //A
        for (var k = 0; k < arch_inc[1]; k++) {
            heat_rf.add([94, 260, 1]);
        }
        for (var k = 0; k < arch_inc[1]; k++) {
            heat_rf.add([108, 310, 1]);
        }
        for (var k = 0; k < arch_inc[1]; k++) {
            heat_rf.add([114, 360, 1]);
        }

        //H1
        for (var k = 0; k < heel1_inc[1]; k++) {
            heat_rf.add([156, 492, 1]);
        }
        for (var k = 0; k < heel1_inc[1]; k++) {
            heat_rf.add([124, 492, 1]);
        }
        for (var k = 0; k < heel1_inc[1]; k++) {
            heat_rf.add([146, 442, 1]);
        }
        //H2
        for (var k = 0; k < heel2_inc[1]; k++) {
            heat_rf.add([106, 465, 1]);
        }

        //T1
        for (var k = 0; k < toe1_inc[1]; k++) {
            heat_rf.add([30, 60, 1]);
        } 
        //T2
        for (var k = 0; k < toe2_inc[1]; k++) {
            heat_rf.add([152, 120, 1]);
        } 
    }
    // Clearing the previous animation and drawing new animation in canvas image for right foot	and right knee
    heat_rf.draw();
    heat_rf.clear(data);
    heat_rf.clearContext();
//    foot_ctx_r.drawImage(foot_img_r, 0, 0);
    if($(window).width() < 768){
        foot_ctx_r.drawImage(foot_img_r, 0, 0, 140, 366, 0, 0, 140, 366);
    }else{
        foot_ctx_r.drawImage(foot_img_r, 0, 0, 140, 366, 0, 0, 210, 549);
    }
    //heat_rk.draw();
    //heat_rk.clear(data);
    //heat_rk.clearContext();
    //knee_ctx_r.drawImage(knee_img_r, 0, 0);
    //knee_img_r.src = "img/heatmap/knee_rt1.png";

    //G Comment
    // foot_img_r.src = "img/foot_rt.png";
}

var activities=new Array();
function displayShoeRecommendation(shoeRecommendationObj){
    var colData=[];
    var objectId=[];
    var shoeBrand=[];
    var shoeName=[];
    var score=[];

    colData = ["Brand Name","Shoe Name","Score"];
    for(var i=0; i<shoeRecommendationObj.length;i++){
        objectId[i] = shoeRecommendationObj[i]['obj_id'];
        shoeBrand[i] = shoeRecommendationObj[i]['shoeBrand'];
        shoeName[i] = shoeRecommendationObj[i]['shoeName'];
        score[i] = shoeRecommendationObj[i]['shoeScore'];
        activities.push([shoeBrand[i],shoeName[i],score[i]]);
    }
    var data = {"Cols":colData, "Rows":activities};
    var table = $('<table>').attr("id", "querytable").addClass("display").attr("cellspacing", "0").attr("width", "100%");
    var tr = $('<tr/>');
    table.append('<thead style="background-color:#0373A2;color:white;font-family: Oswald, sans-serif;">').children('thead').append(tr);
    for (var i=0; i< data.Cols.length; i++){ // column
        tr.append('<td style="font-size:20px;text-align:center;">'+data.Cols[i]+'</td>');
    }

    for(var r=0; r < data.Rows.length; r++){   // row
        tr = $('<tr/>');
        table.append(tr);
        for(var c=0; c < data.Cols.length; c++){
            tr.append('<td style="font-size:18px;text-align:center;"    >'+data.Rows[r][c]+'</td>');
        }
    }
    $('#showRec').append(table);

    if(shoeRecommendationObj.length==0){
        $('#showRec').css('display','none');
        $('#scoreNote').css('display','none');
    }
}

// localization for dialog box that appears on clicking send button
dialogBoxString = {"ja":["Eメール？" ,"レポートの送信先"], "pt":["O email?","Enviar relatório para"], "zh":["电子邮件？","发送报告给"]};
function isConfirm(){
    if(!customerEmail){
        if(currentLang[0] == null || currentLang[0] == "eng" || !(Object.keys(dialogBoxString).includes(currentLang[0]))){
            bootbox.prompt("Email?" , function(email) {
                if (email) {
                    sendReport(email);
                    //updateCustomerEmail(email, activityId);
                    //$.niftyNoty({
                    //    type: 'success',
                    //    icon : 'fa fa-check',
                    //    container : 'floating',
                    //    timer : 3000
                    //});
                }else{
                    //$.niftyNoty({
                    //    type: 'danger',
                    //    icon : 'fa fa-minus',
                    //    message : 'User declined dialog.',
                    //    container : 'floating',
                    //    timer : 3000
                    //});
                };
            });
        }else{
            bootbox.prompt((dialogBoxString[currentLang[0]])[0], function(email) {
                if (email) {
                    sendReport(email);
                    //updateCustomerEmail(email, activityId);
                    //$.niftyNoty({
                    //    type: 'success',
                    //    icon : 'fa fa-check',
                    //    container : 'floating',
                    //    timer : 3000
                    //});
                }else{
                    //$.niftyNoty({
                    //    type: 'danger',
                    //    icon : 'fa fa-minus',
                    //    message : 'User declined dialog.',
                    //    container : 'floating',
                    //    timer : 3000
                    //});
                };
            });
        }
    }else{
        if(currentLang[0] == null || currentLang[0] == "eng" || !(Object.keys(dialogBoxString).includes(currentLang[0]))){
            bootbox.confirm("Send report to "+customerEmail+"?", function(result) {
                if (result) {
                    sendReport(customerEmail);
                    //$.niftyNoty({
                    //    type: 'success',
                    //    icon : 'fa fa-check',
                    //    message : 'User confirmed dialog',
                    //    container : 'floating',
                    //    timer : 3000
                    //});
                }else{
                    //$.niftyNoty({
                    //    type: 'danger',
                    //    icon : 'fa fa-minus',
                    //    message : 'User declined dialog.',
                    //    container : 'floating',
                    //    timer : 3000
                    //});
                };
            });
        }else{
            bootbox.confirm((dialogBoxString[currentLang[0]])[1]+" "+customerEmail+"?", function(result) {
                if (result) {
                    sendReport(customerEmail);
                    //$.niftyNoty({
                    //    type: 'success',
                    //    icon : 'fa fa-check',
                    //    message : 'User confirmed dialog',
                    //    container : 'floating',
                    //    timer : 3000
                    //});
                }else{
                    //$.niftyNoty({
                    //    type: 'danger',
                    //    icon : 'fa fa-minus',
                    //    message : 'User declined dialog.',
                    //    container : 'floating',
                    //    timer : 3000
                    //});
                };
            });
        }
    }
}

function sendReport(email){
    // console.log(customerTypeVal);
    var ReportAssessment = Parse.Object.extend("Reports");
    var reportAssessment = new ReportAssessment();
    reportAssessment.set("userId",userId);
    if(name!=undefined || name != "undefined" || name.length>0){
        reportAssessment.set("userName",name);
    }
    reportAssessment.set("activityMode",activity);
    reportAssessment.set("assessmentDate",dates);
    reportAssessment.set("stepCount",[leftTotalCount+rightTotalCount]);
    reportAssessment.set("strideRate",[avgStrideRate]);
    reportAssessment.set("strideLength",[strideLengthLeft,strideLengthRight]);
    reportAssessment.set("gct",[gctLeft,gctRight]);
    reportAssessment.set("isStepCount",stepCountFlag);
    reportAssessment.set("isStrideRate",strideRateFlag);
    reportAssessment.set("isStrideLength",stridelengthFlag);
    reportAssessment.set("isGct",gCTFlag);
    reportAssessment.set("overPronate",[100-leftOverPronate,leftOverPronate,100-rightOverPronate,rightOverPronate]);
    reportAssessment.set("footStrike",[leftFrontCount,leftMidCount,leftHeelCount,rightFrontCount,rightMidCount,rightHeelCount]);
    reportAssessment.set("overStride",[100-leftOverStride,leftOverStride,100-rightOverStride,rightOverStride]);
    reportAssessment.set("isOverPronate",footMovementFlag);
    reportAssessment.set("isFootStrike",strikeDistributionFlag);
    reportAssessment.set("isOverStride",overStrideFlag);
    reportAssessment.set("bodyBalance",[balance]);
    reportAssessment.set("isBodyBalance",bodyBalanceFlag);
    reportAssessment.set("stressF1F2MAH1H2T1T2",stressParseArray);
    reportAssessment.set("isStressValue",stressValueFlag);
    reportAssessment.set("isStressMap",stressMapFlag);
    reportAssessment.set("sentEmail",email);
    reportAssessment.set("comment",$("#feedbackOne").val());
    reportAssessment.set("isComment",feedbackOneFlag);
    reportAssessment.set("isTable",tableMapFlag);
    reportAssessment.set("shoeRecommendation",activities);
    reportAssessment.set("totalTime",totalTime);
    reportAssessment.set("customerType",customerTypeVal);
    reportAssessment.save(null, {

        success: function(reportAssessmentObject){
            // Execute any logic that should take place after the object is saved.
            viewLink = "http://www.stridalyzer.retisense.com/app/report-view.html?id="+encodeUserId(reportAssessmentObject.id);
            var EA = Parse.Object.extend("Reports");
            var eA = new EA();
            eA.id = reportAssessmentObject.id;
            eA.set("link",viewLink);
            eA.save(null,{
                success: function(reportObject){
                    $.ajax({
                        type: "POST",
                        url: "http://www.stridalyzer.retisense.com/app/send-assessment.php",
                        // data: {link: viewLink, email: email, name: name, drName: drName},
                        data: {link: viewLink, email: email, name: name, drName: drName, customertype: customerTypeVal},
                        success: function(data){
                            bootbox.alert({size: "small", message:"Report sent to "+email});
                        },
                        error: function(err){
                            bootbox.alert({size: "small", message:"Couldn't reach server! Please use web portal."});
                        }
                    });
                }
            })
        },
        error: function(reportAssessmentObject, error) {
            // Execute any logic that should take place if the save fails.
            // error is a Parse.Error with an error code and message.
            bootbox.alert({size: "small", message:"Couldn't reach server! Please use web portal."});
        }
    });
}

function updateCustomerEmail(email, activityId) {
    var activityQuery = new Parse.Query("Activity");
    activityQuery.equalTo("activityId", activityId);
    activityQuery.first({
        success: function (result) {
            result.save(null, {
                success: function (result) {
                    result.set("customerEmail", email);
                    result.save();
                    sendReport(email);
                },
                error: function (error) {
                    bootbox.alert({size: "small", message: "Encountered problem with server! Please try again after sometime."});
                }
            });
        },
        error: function (error) {
            bootbox.alert({size: "small", message: "Encountered problem with server! Please try again after sometime."});
        }
    });
}

function displayFootImage(){ // this function is created to atleast show both foots in stress map even if there is no stride data
    if($(window).width() < 768){
        $('#canvas1').attr('width','140');
        $('#canvas1').attr('height','366');
        $('#canvas2').attr('width','140');
        $('#canvas2').attr('height','366');
    }else{
        $('#canvas1').attr('width','210');
        $('#canvas1').attr('height','549');
        $('#canvas2').attr('width','210');
        $('#canvas2').attr('height','549');
    }
    // Loading the Canvas with image for Left Foot
    var foot_canvas_l = document.getElementById('canvas1');
    foot_ctx_l = foot_canvas_l.getContext('2d');
    foot_img_l = new Image();
    foot_ctx_l.globalAlpha = 0.7;
    foot_img_l.onload = function () {
        if($(window).width() < 768){
            foot_ctx_l.drawImage(foot_img_l, 0, 0, 140, 366, 0, 0, 140, 366);
        }else{
            foot_ctx_l.drawImage(foot_img_l, 0, 0, 140, 366, 0, 0, 210, 549);
        }
    };
    foot_img_l.src = "img/foot_lt.png";

    // Empty array
    // Loading the Canvas with image for Right Foot
    var foot_canvas_r = document.getElementById('canvas2');
    foot_ctx_r = foot_canvas_r.getContext('2d');
    foot_img_r = new Image();
    foot_ctx_r.globalAlpha = 0.7;
    foot_img_r.onload = function () {
        if($(window).width() < 768){
            foot_ctx_r.drawImage(foot_img_r, 0, 0, 140, 366, 0, 0, 140, 366);
        }else{
            foot_ctx_r.drawImage(foot_img_r, 0, 0, 140, 366, 0, 0, 210, 549);
        }
    };
    foot_img_r.src = "img/foot_rt.png";
}

var allActivityObjs = JSON.parse(sessionStorage.getItem("activityObj"));
//trend tooltip 

function trendsTooltip(thisElement){
    //remove all the other trend windows
    $('.newChart').remove();
    tooltipArrayFunctions = {"cadenceTrend":"returnCadenceValue", "gctTrend":"returnGCTValue"};  // {id:functionname} 
    tooltipArray = {"cadenceTrend":"lengthRateGCT", "gctTrend":"lengthRateGCT"};  // {id:parsecolumnname}
    var valToBePutOnGraph = [];
    if(tooltipArray.hasOwnProperty(thisElement.id) && tooltipArray[thisElement.id] != ""){
        // query to fetch data to show trends for the particular selected field.
        fnName = tooltipArrayFunctions[thisElement.id]; // fetch the corresponding function name
        for(i=0;i<allActivityObjs.length;i++){ // start a loop to fill all the older values needed to show points on the graph
            if(allActivityObjs[i]['customerEmail'] == customerEmail && allActivityObjs[i]['activityMode'] == activity){
                valToBePutOnGraph.push(window[fnName](allActivityObjs[i][tooltipArray[thisElement.id]])); // to call a function by using another variable having its real function name, use window[variable]
            }
        }
        showTrendTooltip(thisElement, valToBePutOnGraph);
    } else { // do nothing
    }
}

//module to show the graph depending on "which element on the screen was clicked" i.e; thisElement and the values in the array "valToBePutOnGraph" 
function showTrendTooltip(thisElement, valToBePutOnGraph){
    //append element on the screen where tapped or clicked
    var element = '<b><div class="newChart" style="position: absolute; left: 120px; top: 120px; border: 2px solid red;"></div></b>';
    $(thisElement).append(element); 
    // preparing data for the graph   
    if(valToBePutOnGraph.filter(Array.isArray).length === 0){ // to check whether the array is 2d or 1d, if 1D then it is one amongst [Cadence or body balance], if 2d means its [GCT or Stride length etc.]
        var data = {labels: ['a', 'b', 'c', 'd', 'e', 'f'],series: [valToBePutOnGraph]}; 
    } else {
        var valToBePutOnGraphLeft = []; var valToBePutOnGraphRight = [];
        for(c=0;c<valToBePutOnGraph.length;c++){
            valToBePutOnGraphLeft[c] = valToBePutOnGraph[c][0];
            valToBePutOnGraphRight[c] = valToBePutOnGraph[c][1];
        } // segregating left foot and right foot values
        var data = {labels: ['1', '2', '3', '4', '5', '6'],series: [valToBePutOnGraphLeft,valToBePutOnGraphRight]};                
    }
    // preparing options for the graph        
    var options = {showPoint: true,lineSmooth: true,
        axisX: {showGrid: false,showLabel: true},
        axisY: {labelInterpolationFnc: function(value) {return value;}}
    };
    // creating the chart and appending it
    new Chartist.Line('.newChart', data, options);
}

//ALL THE FUNCTIONS DOEN BELOW ARE USED IN THE "show trend" feature 
//starts here
//calculating cadence value
function returnCadenceValue(lengthRateGCT){
    strideRateLeft = lengthRateGCT[0][1]; 
    strideRateRight = lengthRateGCT[1][1];
    if (strideRateLeft == 0) {
        return strideRateRight;
    } else if (strideRateRight == 0) {
        return strideRateLeft;
    } else {
        return strideRateLeft;
    }
}

//manipulating cadence UI
function returnCadenceUI(lengthRateGCT){
    strideRateLeft = lengthRateGCT[0][1]; 
    strideRateRight = lengthRateGCT[1][1];
    if (strideRateLeft == 0 && strideRateRight == 0) {
        strideRateFlag = false;
    } else {
        avgStrideRate = returnCadenceValue(lengthRateGCT);
        $('#avgStrideRate').text(avgStrideRate);
    }
}

//calculating GCT value
function returnGCTValue(lengthRateGCT){

    gctLeft = lengthRateGCT[0][2];   //gct s
    gctRight = lengthRateGCT[1][2];    
    console.log("\n" + gctLeft + " " + gctRight);
    return [gctLeft,gctRight];
}

//to hide the trend graph on clicking anywhere else on the other part of page
$(document.body).click(function(){
    $('.newChart').remove();
});
$(".trend").click(function(e){
    $('.newChart').show();   
    e.stopPropagation(); // this stops the event from bubbling up to the body    
});
//ends here ("show trend" feature)

// this function controls the buttons in stress map to show action replay.
function changeStressmap(element){
    console.log(currentStride);
    // step: 1 deciding which button was pressed
    if(element.id == "stressNext" || element.id == "stressPrev"){
        //remove active from average button
        $('#stressAvg').removeClass("active");
        // step 2: stride data is in localstorage "strides"
        var nowStrides = JSON.parse(window.localStorage.getItem('strides'));
//        var nowStrides = [{"userId":"qoa1uwmYtK","heel_rel":1,"stride_rate":76,"stride_length":130,"ball_rel":22,"updatedAt":"2018-12-14T12:37:19.710Z","isLeft":0,"timeStamp":60,"side_rel":10,"gct":600,"knee_rel":0,"isWalk":1,"createdAt":"2018-12-14T11:06:08.722Z","count":43,"stressF1F2SAH":[22,9,10,12,1,0,4,78],"lr_total":0,"arch_rel":12,"strike_type":1,"activityId":"647938D38F","ACL":{"*":{"read":true},"qoa1uwmYtK":{"read":true,"write":true}},"objectId":"xqbWCJGgdY"},
//                          {"userId":"qoa1uwmYtK","heel_rel":1,"stride_rate":71,"stride_length":134,"ball_rel":1,"updatedAt":"2018-12-14T11:06:28.560Z","isLeft":1,"timeStamp":80,"side_rel":9,"gct":600,"knee_rel":0,"isWalk":2,"createdAt":"2018-12-14T11:06:28.560Z","count":58,"stressF1F2SAH":[1,4,9,5,1,0,0,81],"lr_total":0,"arch_rel":5,"strike_type":1,"activityId":"647938D38F","ACL":{"*":{"read":true},"qoa1uwmYtK":{"read":true,"write":true}},"objectId":"kqbGUYc4TV"},
//                          {"userId":"qoa1uwmYtK","heel_rel":0,"stride_rate":64,"stride_length":166,"ball_rel":0,"updatedAt":"2018-12-14T11:06:38.358Z","isLeft":0,"timeStamp":90,"side_rel":5,"gct":600,"knee_rel":0,"isWalk":2,"createdAt":"2018-12-14T11:06:38.358Z","count":65,"stressF1F2SAH":[10,5,15,1,9,19,6,27],"lr_total":0,"arch_rel":1,"strike_type":1,"activityId":"647938D38F","ACL":{"*":{"read":true},"qoa1uwmYtK":{"read":true,"write":true}},"objectId":"T4JhyqRXQG"},
//                          {"userId":"qoa1uwmYtK","heel_rel":1,"stride_rate":37,"stride_length":266,"ball_rel":15,"updatedAt":"2018-12-14T11:08:55.830Z","isLeft":1,"timeStamp":100,"side_rel":12,"gct":801,"knee_rel":0,"isWalk":2,"createdAt":"2018-12-14T11:08:55.830Z","count":91,"stressF1F2SAH":[19,9,12,18,1,0,0,17],"lr_total":0,"arch_rel":8,"strike_type":1,"activityId":"647938D38F","ACL":{"*":{"read":true},"qoa1uwmYtK":{"read":true,"write":true}},"objectId":"2eMtR37Ya1"},
//                          {"userId":"qoa1uwmYtK","heel_rel":1,"stride_rate":37,"stride_length":266,"ball_rel":15,"updatedAt":"2018-12-14T11:08:55.830Z","isLeft":1,"timeStamp":130,"side_rel":12,"gct":801,"knee_rel":0,"isWalk":2,"createdAt":"2018-12-14T11:08:55.830Z","count":91,"stressF1F2SAH":[7,20,9,2,9,10,0,22],"lr_total":0,"arch_rel":8,"strike_type":1,"activityId":"647938D38F","ACL":{"*":{"read":true},"qoa1uwmYtK":{"read":true,"write":true}},"objectId":"2eMtR37Ya1"},
//                          {"userId":"qoa1uwmYtK","heel_rel":1,"stride_rate":37,"stride_length":266,"ball_rel":15,"updatedAt":"2018-12-14T11:08:55.830Z","isLeft":0,"timeStamp":160,"side_rel":12,"gct":801,"knee_rel":0,"isWalk":2,"createdAt":"2018-12-14T11:08:55.830Z","count":91,"stressF1F2SAH":[3,8,10,9,4,9,0,12],"lr_total":0,"arch_rel":8,"strike_type":1,"activityId":"647938D38F","ACL":{"*":{"read":true},"qoa1uwmYtK":{"read":true,"write":true}},"objectId":"2eMtR37Ya1"},
//                          {"userId":"qoa1uwmYtK","heel_rel":1,"stride_rate":37,"stride_length":266,"ball_rel":15,"updatedAt":"2018-12-14T11:08:55.830Z","isLeft":1,"timeStamp":190,"side_rel":12,"gct":801,"knee_rel":0,"isWalk":2,"createdAt":"2018-12-14T11:08:55.830Z","count":91,"stressF1F2SAH":[12,38,15,5,12,0,0,16],"lr_total":0,"arch_rel":8,"strike_type":1,"activityId":"647938D38F","ACL":{"*":{"read":true},"qoa1uwmYtK":{"read":true,"write":true}},"objectId":"2eMtR37Ya1"}];
        // set the next stride data to the stress map.
        if(currentStride == undefined || nowStrides.length == currentStride+1){
            if(element.id == "stressPrev"){return;}
            currentStride = 0;
        }else{
            if(element.id == "stressPrev"){
                if(currentStride == 0){return;}
                else{--currentStride;}
            }else{++currentStride;}
        }
        // step 3: fetch which stride data is presently used to show stress map.
        // console.log("length: "+ nowStrides.length);
        // this format supports old(f1f2sah) and new(f1f2sah1h2t1t2) INSIGHT insoles  .
        var strideArray = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]; // F1F2SAH1H2T1T2 * 2 = 16
        if(nowStrides[currentStride]['stressF1F2SAH1H2T1T2']){
            if(nowStrides[currentStride]['isLeft'] == 1){
                for(var i=0; i<8;i++){strideArray[i] = nowStrides[currentStride]['stressF1F2SAH1H2T1T2'][i];}
            } else{
                for(i=8; i<16;i++){strideArray[i] = nowStrides[currentStride]['stressF1F2SAH1H2T1T2'][i-8];}
            }
        } else{
            if(nowStrides[currentStride]['isLeft'] == 1){
                for(var i=0; i<8;i++){strideArray[i] = nowStrides[currentStride]['stressF1F2SAH'][i];}
            } else{
                for(i=8; i<16;i++){strideArray[i] = nowStrides[currentStride]['stressF1F2SAH'][i-8];}
            }
        }
        displayStressMap(strideArray);
    } else if(element.id == "stressAvg"){
        if(element.classList.contains("active") == true){
            return;
        }else{
            $('#stressAvg').addClass("active");
            var avgStride = JSON.parse(window.localStorage.getItem('avgStride'));
            displayStressMap(avgStride);
        }
    }
}

};