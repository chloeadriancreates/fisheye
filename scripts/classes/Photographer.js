class Photographer {
    constructor(photographer) {
        this.name = photographer.name;
        this.picture = `assets/photographers/${photographer.portrait}`;
        this.id = photographer.id;
        this.city = photographer.city;
        this.country = photographer.country;
        this.price = photographer.price;
        this.tagline = photographer.tagline;
    }

    createUserCard() {
        const article = document.createElement( "article" );
        article.setAttribute("class", "userCard");

        const link = document.createElement("a");
        link.setAttribute("href", `./photographer.html?id=${this.id}`);
        link.setAttribute("title", this.name);
        link.setAttribute("class", "userCard_link");

        const img = document.createElement( "img" );
        img.setAttribute("src", this.picture);
        img.setAttribute("class", "userCard_picture");
        img.setAttribute("alt", this.name);

        const h2 = document.createElement( "h2" );
        h2.textContent = this.name;
        h2.setAttribute("class", "userCard_name");

        link.appendChild(img);
        link.appendChild(h2);

        const pLocation = document.createElement( "p" );
        pLocation.setAttribute("class", "userCard_location");
        pLocation.setAttribute("lang", "en");
        pLocation.textContent = `${this.city}, ${this.country}`;

        const pTagline = document.createElement( "p" );
        pTagline.setAttribute("class", "userCard_tagline");
        pTagline.textContent = this.tagline;

        const pPrice = document.createElement( "p" );
        pPrice.setAttribute("class", "userCard_price");
        pPrice.textContent = `${this.price}€/jour`;

        article.appendChild(link);
        article.appendChild(pLocation);
        article.appendChild(pTagline);
        article.appendChild(pPrice);
        
        return (article);
    }

    createProfileCard() {
        const article = document.createElement("article");
        article.setAttribute("class", "profileCard");

        const caption = document.createElement("div");
        caption.setAttribute("class", "profileCard_caption");

        const h1 = document.createElement("h1");
        h1.textContent = this.name;
        h1.setAttribute("class", "profileCard_name");

        const pLocation = document.createElement("p");
        pLocation.setAttribute("class", "profileCard_location");
        pLocation.textContent = `${this.city}, ${this.country}`;
        pLocation.setAttribute("lang", "en");

        const pTagline = document.createElement("p");
        pTagline.setAttribute("class", "profileCard_tagline");
        pTagline.textContent = this.tagline;

        caption.appendChild(h1);
        caption.appendChild(pLocation);
        caption.appendChild(pTagline);

        const button = document.createElement("button");
        button.setAttribute("class", "buttonPrimary");
        button.textContent = "Contactez-moi";
        button.addEventListener("click", displayModal);

        const img = document.createElement("img");
        img.setAttribute("class", "profileCard_picture");
        img.setAttribute("src", this.picture);
        img.setAttribute("alt", this.name);

        article.appendChild(caption);
        article.appendChild(button);
        article.appendChild(img);

        return (article);
    }
}