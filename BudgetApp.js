$(document).ready(function() {
	
	if (localStorage.getItem("lsEntries") === null) {
		var emptyArray =[];
		localStorage.setItem("lsEntries", JSON.stringify(emptyArray));
		console.log("Data Income Array Created!");
	}
	if (localStorage.getItem("lsEntriesExpense") === null) {
		var emptyArray =[];
		localStorage.setItem("lsEntriesExpense", JSON.stringify(emptyArray));
		console.log("Data Expense Array Created!");
	}
	
	$(".signIn").on("click", function() {
		validation();
	});
	
	function validation() {

	var x = document.getElementById("username").value.toLowerCase();
	var y = document.getElementById("password").value;

	if (x === "admin" && y === "DME") {
			window.location.assign("#home"); //Redirects to Home Page
		}
		else {
			document.getElementById("errorLogin").innerHTML = "Wrong Username or password. Pls try again";
		}
	}
	
	//CONFIRM INCOME CREATION
	$(".confirmIncomeEntry").on("click", function() {
		incomeCreate();
		resetIncomeForm();
	});
	
	function incomeCreate() {
		// Get Values from Form
		var iDate = document.getElementById("iDateCreate").value;
		var iName = document.getElementById("iNameCreate").value;
		var iCategory = document.getElementById("iCategoryCreate").value;
		var iAmountCreate = document.getElementById("iAmountCreate").value;
		var iTypeOfPaymentCreate = document.getElementById("iTypeOfPaymentCreate").value;
		var iCommentCreate = document.getElementById("iCommentCreate").value;
		var iTransactionStatusCreate = document.getElementById("iTransactionStatusCreate").value;
		var newIncome = [iDate, iName,iCategory, iAmountCreate, iTypeOfPaymentCreate,iCommentCreate,iTransactionStatusCreate, "income"];
//		console.log("New Income: "+newIncome);
		
		var incomeArray = JSON.parse(localStorage.getItem("lsEntries")); //GET ENTRIES from LS
//		console.log("Retrieved LS Data: "+incomeArray);
		
		incomeArray.push(newIncome); // COMBINE ENTRIES (ARRAYS)
//		console.log("New Income Array: "+incomeArray);
		
		localStorage.setItem("lsEntries",JSON.stringify(incomeArray));  //SET ENTRIES to LS
//		console.log("Entry Array LS Set: "+localStorage.getItem("lsEntries"));
	}

	
	function resetIncomeForm() {
		document.getElementById("incomeCreateForm").reset();
		//createTable();
		var incomeArray = JSON.parse(localStorage.getItem("lsEntries")); //GET ENTRIES
//		console.log("TOTAL ARRAY "+incomeArray[0]);
//		console.log("DATE "+incomeArray[0][0]);
//		console.log("NAME "+incomeArray[0][1]);
//		console.log("CATEGORY "+incomeArray[0][2]);
//		console.log("AMOUNT "+incomeArray[0][3]);
//		console.log("TYPE OF PAYMENT "+incomeArray[0][4]);
//		console.log("COMMENT "+incomeArray[0][5]);
//		console.log("STATUS "+incomeArray[0][6]);
	}
	
	
	$(".viewIncomeEntry").on("click", function() {
		incomeView();
	});
	
	function incomeView()  {
		var incomeArray = JSON.parse(localStorage.getItem("lsEntries")); //GET ENTRIES
//		console.log("Income Viewing STARTS!");
//		console.log("THIS IS THE ARRAYS "+incomeArray);
//		console.log("THIS IS THE ARRAY "+incomeArray[0]);
//		console.log("THE LENGTH OF THE ARRAY " +incomeArray[0].length);
//		console.log("DATE "+incomeArray[0][0]);
//		console.log("NAME "+incomeArray[0][1]);
//		console.log("CATEGORY "+incomeArray[0][2]);
//		console.log("AMOUNT "+incomeArray[0][3]);
//		console.log("TYPE OF PAYMENT "+incomeArray[0][4]);
//		console.log("COMMENT "+incomeArray[0][5]);
//		console.log("STATUS "+incomeArray[0][6]);
		$("#showIncome").html("");
		
		for (var i = 0; i < incomeArray.length; i++) { 
			$("#showIncome").append(
				"<u><p class='incomeEntry'> Income Entry "+(i+1)+"</p></u>" + 
				"<p> Date: " + incomeArray[i][0]+ "</p>" + 
				"<p> Name: " + incomeArray[i][1]+ "</p>" + 
				"<p> Category: " + incomeArray[i][2]+ "</p>" + 
				"<p> Amount: " + incomeArray[i][3]+ "</p>" + 
				"<p> Type Of Payment: " + incomeArray[i][4]+ "</p>" + 
				"<p> Comment: " + incomeArray[i][5]+ "</p>" + 
				"<p> Status: " + incomeArray[i][6]+ "</p>" +
				"<hr>"
			);
		
		}
	}
	
		//SEARCH FUNCTION
	$(".iSearchOption").on("click", function() {
		$("#iSearchValidation").html("");
		var iSearchCategory = document.getElementById("iSearchCategory").value;
		//console.log(iSearchCategory); //TROUBLESHOOTING
		if (iSearchCategory === "Fixed Asset") {
			$("#iAI").html("");
			$("#iAI").append(" Fixed Asset(s)?");
			$("#iFilterCategoriesFA").html("");
			$("#iFilterCategoriesCA").html("");
			$("#iFilterPaymentModeCash").html("");
			$("#iFilterPaymentModeCredit").html("");
			iSearchFixedAsset();
			window.location.assign("#iFilter"); //Redirects
		}
		else if(iSearchCategory === "Current Asset"){
//			console.log("FIXED ASSET IS NOT SELECTED,  CURRENT ASSET IS SELECTED!");
			$("#iAI").html("");
			$("#iAI").append(" Current Asset(s)?");
			$("#iFilterCategoriesFA").html("");
			$("#iFilterCategoriesCA").html("");
			$("#iFilterPaymentModeCash").html("");
			$("#iFilterPaymentModeCredit").html("");
			iSearchCurrentAsset();
			window.location.assign("#iFilter"); //Redirects
		}
		var iSearchPaymentMode = document.getElementById("iSearchPaymentMode").value;
		if (iSearchPaymentMode === "Cash") {
			$("#iAI").html("");
			$("#iAI").append(" Cash type of payment(s)?");
			$("#iFilterCategoriesFA").html("");
			$("#iFilterCategoriesCA").html("");
			$("#iFilterPaymentModeCash").html("");
			$("#iFilterPaymentModeCredit").html("");
			iSearchCash();
			window.location.assign("#iFilter"); //Redirects
		}
		else if (iSearchPaymentMode === "Credit") {
//			console.log(" CREDIT IS SELECTED! CASH IS NOT SELECTED!!");
			$("#iAI").html("");
			$("#iAI").append(" Credit type of payment(s)?");
			$("#iFilterCategoriesFA").html("");
			$("#iFilterCategoriesCA").html("");
			$("#iFilterPaymentModeCash").html("");
			$("#iFilterPaymentModeCredit").html("");
			searchCredit();
			window.location.assign("#iFilter"); //Redirects
		}
		else if((iSearchCategory === "--") && (iSearchPaymentMode === "--")){
			$("#iSearchValidation").append("&#9888; Please choose 1 of the above to search for your entries.");
		}
	});
	
	//SEARCH FIXED ASSETS
	function iSearchFixedAsset() {
		var incomeArray = JSON.parse(localStorage.getItem("lsEntries")); //GET ENTRIES
		$("#iFilterCategoriesFA").html("");

		for (var i = 0; i < incomeArray.length; i++) { 
			if (incomeArray[i][2]==="Fixed Asset") {
				console.log("IT IS FIXED ASSETS!!");
				$("#iFilterCategoriesFA").append(
					"<u><p class='incomeEntry'> Income Entry "+(i+1)+"</p></u>" + 
					"<p> Date: " + incomeArray[i][0]+ "</p>" + 
					"<p> Name: " + incomeArray[i][1]+ "</p>" + 
					"<p> Category: " + incomeArray[i][2]+ "</p>" + 
					"<p> Amount: " + incomeArray[i][3]+ "</p>" + 
					"<p> Type Of Payment: " + incomeArray[i][4]+ "</p>" + 
					"<p> Comment: " + incomeArray[i][5]+ "</p>" + 
					"<p> Status: " + incomeArray[i][6]+ "</p>" +
					"<hr>"
				);			
			}
			else {
				console.log("IT IS NOT FIXED ASSETS!!");
			}		
		}
	}
	
	//SEARCH CURRENT ASSET
	function iSearchCurrentAsset() {
		var incomeArray = JSON.parse(localStorage.getItem("lsEntries")); //GET ENTRIES
		$("#iFilterCategoriesCA").html("");

		for (var i = 0; i < incomeArray.length; i++) { 
			if (incomeArray[i][2]==="Current Asset") {
				console.log("IT IS CURRENT ASSETS!!");
				$("#iFilterCategoriesCA").append(
					"<u><p class='incomeEntry'> Income Entry "+(i+1)+"</p></u>" + 
					"<p> Date: " + incomeArray[i][0]+ "</p>" + 
					"<p> Name: " + incomeArray[i][1]+ "</p>" + 
					"<p> Category: " + incomeArray[i][2]+ "</p>" + 
					"<p> Amount: " + incomeArray[i][3]+ "</p>" + 
					"<p> Type Of Payment: " + incomeArray[i][4]+ "</p>" + 
					"<p> Comment: " + incomeArray[i][5]+ "</p>" + 
					"<p> Status: " + incomeArray[i][6]+ "</p>" +
					"<hr>"
				);			
			}
			else {
				console.log("IT IS NOT CURRENT ASSETS!!");
			}		
		}
	}

	//SEARCH CASH
	function iSearchCash() {
		var incomeArray = JSON.parse(localStorage.getItem("lsEntries")); //GET ENTRIES
		$("#iFilterPaymentModeCash").html("");

		for (var i = 0; i < incomeArray.length; i++) { 
			if (incomeArray[i][4]==="Cash") {
				console.log("IT IS CASH!!");
				$("#iFilterPaymentModeCash").append(
					"<u><p class='incomeEntry'> Income Entry "+(i+1)+"</p></u>" + 
					"<p> Date: " + incomeArray[i][0]+ "</p>" + 
					"<p> Name: " + incomeArray[i][1]+ "</p>" + 
					"<p> Category: " + incomeArray[i][2]+ "</p>" + 
					"<p> Amount: " + incomeArray[i][3]+ "</p>" + 
					"<p> Type Of Payment: " + incomeArray[i][4]+ "</p>" + 
					"<p> Comment: " + incomeArray[i][5]+ "</p>" + 
					"<p> Status: " + incomeArray[i][6]+ "</p>" +
					"<hr>"
				);			
			}
			else {
				console.log("IT IS NOT CASH!!");
			}		
		}
	}
	
	//SEARCH CREDIT
	function searchCredit() {
		var incomeArray = JSON.parse(localStorage.getItem("lsEntries")); //GET ENTRIES
		$("#iFilterPaymentModeCredit").html("");

		for (var i = 0; i < incomeArray.length; i++) { 
			if (incomeArray[i][4]==="Credit") {
				console.log("IT IS CREDIT!!");
				$("#iFilterPaymentModeCredit").append(
					"<u><p class='incomeEntry'> Income Entry "+(i+1)+"</p></u>" + 
					"<p> Date: " + incomeArray[i][0]+ "</p>" + 
					"<p> Name: " + incomeArray[i][1]+ "</p>" + 
					"<p> Category: " + incomeArray[i][2]+ "</p>" + 
					"<p> Amount: " + incomeArray[i][3]+ "</p>" + 
					"<p> Type Of Payment: " + incomeArray[i][4]+ "</p>" + 
					"<p> Comment: " + incomeArray[i][5]+ "</p>" + 
					"<p> Status: " + incomeArray[i][6]+ "</p>" +
					"<hr>"
				);			
			}
			else {
				console.log("IT IS NOT CREDIT!!");
			}		
		}
	}
	
	
//--------------------------------------------------------------------------
//EXPENSES
	
	//CONFIRM EXPENSE CREATION
	$(".confirmExpenseEntry").on("click", function() {
		expenseCreate();
		resetExpenseForm();
	});
	
		function expenseCreate() {
		// Get Values from Form
		var eDate = document.getElementById("eDateCreate").value;
		var eName = document.getElementById("eNameCreate").value;
		var eCategory = document.getElementById("eCategoryCreate").value;
		var eAmountCreate = document.getElementById("eAmountCreate").value;
		var eTypeOfPaymentCreate = document.getElementById("eTypeOfPaymentCreate").value;
		var eCommentCreate = document.getElementById("eCommentCreate").value;
		var eTransactionStatusCreate = document.getElementById("eTransactionStatusCreate").value;
		var newExpense = [eDate, eName,eCategory, eAmountCreate, eTypeOfPaymentCreate,eCommentCreate,eTransactionStatusCreate, "expense"];
//		console.log("New Expense: "+newExpense);
		
		
		var expenseArray  = JSON.parse(localStorage.getItem("lsEntriesExpense")); //GET ENTRIES from LS
//		console.log("Retrieved LS Data: "+expenseArray);
		
		expenseArray.push(newExpense); // COMBINE ENTRIES (ARRAYS)
//		console.log("New Expense Array: "+expenseArray);
		
		localStorage.setItem("lsEntriesExpense",JSON.stringify(expenseArray));  //SET ENTRIES to LS
//		console.log("Entry Array LS Set: "+localStorage.getItem("lsEntriesExpense"));
	}

		function resetExpenseForm() {
		document.getElementById("expenseCreateForm").reset();
		var expenseArray = JSON.parse(localStorage.getItem("lsEntriesExpense")); //GET ENTRIES
//		console.log("TOTAL ARRAY "+expenseArray[0]);
//		console.log("DATE "+expenseArray[0][0]);
//		console.log("NAME "+expenseArray[0][1]);
//		console.log("CATEGORY "+expenseArray[0][2]);
//		console.log("AMOUNT "+expenseArray[0][3]);
//		console.log("TYPE OF PAYMENT "+expenseArray[0][4]);
//		console.log("COMMENT "+expenseArray[0][5]);
//		console.log("STATUS "+expenseArray[0][6]);
	}

	//VIEW EXPENSE ENTRY
	$(".viewExpenseEntry").on("click", function() {
		expenseView();
	});
	
		function expenseView()  {
		var expenseArray = JSON.parse(localStorage.getItem("lsEntriesExpense")); //GET ENTRIES
//		console.log("Expense Viewing STARTS!");
//		console.log("THIS IS THE ARRAYS "+expenseArray);
//		console.log("THIS IS THE ARRAY "+expenseArray[0]);
//		console.log("THE LENGTH OF THE ARRAY " +expenseArray[0].length);
//		console.log("DATE "+expenseArray[0][0]);
//		console.log("NAME "+expenseArray[0][1]);
//		console.log("CATEGORY "+expenseArray[0][2]);
//		console.log("AMOUNT "+expenseArray[0][3]);
//		console.log("TYPE OF PAYMENT "+expenseArray[0][4]);
//		console.log("COMMENT "+expenseArray[0][5]);
//		console.log("STATUS "+expenseArray[0][6]);
	
		$("#showExpense").html("");
		for (var i = 0; i < expenseArray.length; i++) { 
			$("#showExpense").append(
				"<u><p class='expenseEntry'> Expense Entry "+(i+1)+"</p></u>" + 
				"<p> Date: " + expenseArray[i][0]+ "</p>" + 
				"<p> Name: " + expenseArray[i][1]+ "</p>" + 
				"<p> Category: " + expenseArray[i][2]+ "</p>" + 
				"<p> Amount: " + expenseArray[i][3]+ "</p>" + 
				"<p> Type Of Payment: " + expenseArray[i][4]+ "</p>" + 
				"<p> Comment: " + expenseArray[i][5]+ "</p>" + 
				"<p> Status: " + expenseArray[i][6]+ "</p>" +
				"<hr>"
			);
		
		}
	}
	
	
	
	//SEARCH FUNCTION
	$(".eSearchOption").on("click", function() {
		var eSearchCategory = document.getElementById("eSearchCategory").value;
			$("#eSearchValidation").html("");
		//console.log(eSearchCategory); //TROUBLESHOOTING
		if (eSearchCategory === "Fixed Asset") {
			console.log("eFIXED ASSET IS SELECTED");
			$("#eAI").html("");
			$("#eAI").append(" Fixed Asset(s)?");
			$("#eFilterCategoriesFA").html("");
			$("#eFilterCategoriesCA").html("");
			$("#eFilterPaymentModeCash").html("");
			$("#eFilterPaymentModeCredit").html("");
			eSearchFixedAsset();
			window.location.assign("#eFilter"); //Redirects
		}
		else if(eSearchCategory === "Current Asset"){
//			console.log("eFIXED ASSET IS NOT SELECTED,  eCURRENT ASSET IS SELECTED!");
			$("#eAI").html("");
			$("#eAI").append(" Current Asset(s)?");
			$("#eFilterCategoriesFA").html("");
			$("#eFilterCategoriesCA").html("");
			$("#eFilterPaymentModeCash").html("");
			$("#eFilterPaymentModeCredit").html("");
			eSearchCurrentAsset();
			window.location.assign("#eFilter"); //Redirects
		}
	
		var eSearchPaymentMode = document.getElementById("eSearchPaymentMode").value;
		if (eSearchPaymentMode === "Cash") {
			$("#eAI").html("");
			$("#eAI").append(" Cash type of payment(s)?");
			$("#eFilterCategoriesFA").html("");
			$("#eFilterCategoriesCA").html("");
			$("#eFilterPaymentModeCash").html("");
			$("#eFilterPaymentModeCredit").html("");
			eSearchCash();
			window.location.assign("#eFilter"); //Redirects
		}
		else if (eSearchPaymentMode === "Credit") {
//			console.log(" eCREDIT IS SELECTED! eCASH IS NOT SELECTED!!");
			$("#eAI").html("");
			$("#eAI").append(" Credit type of payment(s)?");
			$("#eFilterCategoriesFA").html("");
			$("#eFilterCategoriesCA").html("");
			$("#eFilterPaymentModeCash").html("");
			$("#eFilterPaymentModeCredit").html("");
			eSearchCredit();
			window.location.assign("#eFilter"); //Redirects
		}
		else if((eSearchCategory === "--") && (eSearchPaymentMode === "--")){
			$("#eSearchValidation").append("&#9888; Please choose 1 of the above to search for your entries.");
		}
	});


	//SEARCH FIXED ASSETS
	function eSearchFixedAsset() {
		var expenseArray = JSON.parse(localStorage.getItem("lsEntriesExpense")); //GET ENTRIES
		$("#eFilterCategoriesFA").html("");

		for (var i = 0; i < expenseArray.length; i++) { 
			if (expenseArray[i][2]==="Fixed Asset") {
				console.log("IT IS eFIXED ASSETS!!");
				$("#eFilterCategoriesFA").append(
					"<u><p class='expenseEntry'> Expense Entry "+(i+1)+"</p></u>" + 
					"<p> Date: " + expenseArray[i][0]+ "</p>" + 
					"<p> Name: " + expenseArray[i][1]+ "</p>" + 
					"<p> Category: " + expenseArray[i][2]+ "</p>" + 
					"<p> Amount: " + expenseArray[i][3]+ "</p>" + 
					"<p> Type Of Payment: " + expenseArray[i][4]+ "</p>" + 
					"<p> Comment: " + expenseArray[i][5]+ "</p>" + 
					"<p> Status: " + expenseArray[i][6]+ "</p>" +
					"<hr>"
				);			
			}
			else {
				console.log("IT IS NOT eFIXED ASSETS!!");
			}		
		}
	}

	//SEARCH CURRENT ASSET
	function eSearchCurrentAsset() {
		var expenseArray = JSON.parse(localStorage.getItem("lsEntriesExpense")); //GET ENTRIES
		$("#eFilterCategoriesCA").html("");

		for (var i = 0; i < expenseArray.length; i++) { 
			if (expenseArray[i][2]==="Current Asset") {
				console.log("IT IS eCURRENT ASSETS!!");
				$("#eFilterCategoriesCA").append(
					"<u><p class='expenseEntry'> Expense Entry "+(i+1)+"</p></u>" + 
					"<p> Date: " + expenseArray[i][0]+ "</p>" + 
					"<p> Name: " + expenseArray[i][1]+ "</p>" + 
					"<p> Category: " + expenseArray[i][2]+ "</p>" + 
					"<p> Amount: " + expenseArray[i][3]+ "</p>" + 
					"<p> Type Of Payment: " + expenseArray[i][4]+ "</p>" + 
					"<p> Comment: " + expenseArray[i][5]+ "</p>" + 
					"<p> Status: " + expenseArray[i][6]+ "</p>" +
					"<hr>"
				);			
			}
			else {
				console.log("IT IS NOT eCURRENT ASSETS!!");
			}		
		}
	}
	
	//SEARCH CASH
	function eSearchCash() {
		var expenseArray = JSON.parse(localStorage.getItem("lsEntriesExpense")); //GET ENTRIES
		$("#eFilterPaymentModeCash").html("");

		for (var i = 0; i < expenseArray.length; i++) { 
			if (expenseArray[i][4]==="Cash") {
				console.log("IT IS CASH!!");
				$("#eFilterPaymentModeCash").append(
					"<u><p class='expenseEntry'> Expense Entry "+(i+1)+"</p></u>" + 
					"<p> Date: " + expenseArray[i][0]+ "</p>" + 
					"<p> Name: " + expenseArray[i][1]+ "</p>" + 
					"<p> Category: " + expenseArray[i][2]+ "</p>" + 
					"<p> Amount: " + expenseArray[i][3]+ "</p>" + 
					"<p> Type Of Payment: " + expenseArray[i][4]+ "</p>" + 
					"<p> Comment: " + expenseArray[i][5]+ "</p>" + 
					"<p> Status: " + expenseArray[i][6]+ "</p>" +
					"<hr>"
				);			
			}
			else {
				console.log("IT IS NOT CASH!!");
			}		
		}
	}
	
	//SEARCH CREDIT
	function eSearchCredit() {
		var expenseArray = JSON.parse(localStorage.getItem("lsEntriesExpense")); //GET ENTRIES
		$("#eFilterPaymentModeCredit").html("");

		for (var i = 0; i < expenseArray.length; i++) { 
			if (expenseArray[i][4]==="Credit") {
				console.log("IT IS eCREDIT!!");
				$("#eFilterPaymentModeCredit").append(
					"<u><p class='expenseEntry'> Expense Entry "+(i+1)+"</p></u>" + 
					"<p> Date: " + expenseArray[i][0]+ "</p>" + 
					"<p> Name: " + expenseArray[i][1]+ "</p>" + 
					"<p> Category: " + expenseArray[i][2]+ "</p>" + 
					"<p> Amount: " + expenseArray[i][3]+ "</p>" + 
					"<p> Type Of Payment: " + expenseArray[i][4]+ "</p>" + 
					"<p> Comment: " + expenseArray[i][5]+ "</p>" + 
					"<p> Status: " + expenseArray[i][6]+ "</p>" +
					"<hr>"
				);			
			}
			else {
				console.log("IT IS NOT eCREDIT!!");
			}		
		}
	}
	
});
