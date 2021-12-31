const Zedge = require('zedge-api-unofficial')
const rdl = require("readline-sync");
const colors = require("colors");
const helper   = require("./helper");

let HELPER = new helper()

// Initialize Class
const zedge = new Zedge();


function cariSaran(kunci)
{
	return zedge.search.searchTerms(kunci)
		.then((e) => e);
}

function cari(kunci,page = 1)
{
	return zedge.search.search(kunci, "WALLPAPER",page)
		.then((e) => e);
}

function ngefilterURLAja(arr)
{
	return arr.map((e) => e.imageUrl)
		.filter((e) => e.startsWith("http"));
}


async function menu()
{

	
	let txt = `
	1. Cari saran kata kunci
	2. Cari kata kunci langsung
	`;
	// console.log(txt);
	// let menu = rdl.question("	== Masukkan pilihan: ");
	// let keyword = rdl.question("	== Masukkan keyword: ");

	let menu = HELPER.read("Masukkan pilihan", txt);
	let keyword = HELPER.read("Masukkan keyword");

	await pilihan(menu, keyword);
}

async function pilihan(menu, keyword)
{
	switch (menu)
	{
		
		case "1":
			let cs = await cariSaran(keyword);
			let pilih = HELPER.read("Pilih keyword", cs.map((e, i) => Number(i+1) + ". " + e).join("\n"));
			let terpilih = cs[Number(pilih - 1)];

			let cr = await cari(terpilih,1);
			
			let totPage = Math.round(cr.total/24);
			console.log("Total Data: " + cr.total);
			console.log("Total Page: " + totPage);
			
			HELPER.read("Lanjut: ?");

			for(let i=1;i<=totPage; i++) {
				console.log("Page: " + i );
				let cri = await cari(keyword,1);
				let hasil = ngefilterURLAja(cri.items);
				HELPER.saveToTxt(terpilih + ".txt", hasil.join("\n"));

			} 
		

	

			// let data = [];
			// for(let i=1;i<;i++) {
			// 	data.push()
			// }

			

			break;
		case "2":


			let cr2 = await cari(keyword,1);
			
			let totPage2 = Math.round(cr2.total/24);
			console.log("Total Data: " + cr2.total);
			console.log("Total Page: " + totPage2);
			
			HELPER.read("Lanjut: ?");

			for(let i=1;i<=totPage2; i++) {
				console.log("Page: " + i );
				let cri = await cari(keyword,1);
				let hasil = ngefilterURLAja(cri.items);
				HELPER.saveToTxt(keyword + ".txt", hasil.join("\n"));

			} 
			break;

		default:
			break;
	}
}


menu();

