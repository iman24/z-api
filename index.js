const Zedge = require('./src');
const rdl = require("readline-sync");
const colors = require("colors");

// Initialize Class
const zedge = new Zedge();


function cariSaran(kunci)
{
	return zedge.search.searchTerms(kunci)
		.then((e) => e);
}

function cari(kunci)
{
	return zedge.search.search(kunci, "WALLPAPER")
		.then((e) => e);
}

function ngefilterURLAja(arr)
{
	return arr.map((e) => e.imageUrl)
		.filter((e) => e.startsWith("http"));
}


function menu()
{
	let txt = `
	1. Cari saran kata kunci
	2. Cari kata kunci langsung
	`;
	console.log(txt);
	let menu = rdl.question("	== Masukkan pilihan: ");
	let keyword = rdl.question("	== Masukkan keyword: ");
	pilihan(menu, keyword);
}

function pilihan(menu, keyword)
{
	switch (menu)
	{
		case "1":
			cariSaran(keyword)
				.then((res) =>
				{
					for (let i in res)
					{
						let urutan = Number(i) + 1;
						console.log("\t" + urutan + ". " + res[i]);
					}

					let pilih = rdl.question("Pilih salahsatu: ");
					cari(res[Number(pilih) - 1])
						.then((e) =>
						{
							console.log("Total: " + e.total);
							console.log("Page: " + Math.round(e.total / 21));
							let hasil = ngefilterURLAja(e.items);
							console.log(hasil.join("\n"));
						});
				});
			break;
		case "2":
			break;

		default:
			break;
	}
}


menu();

