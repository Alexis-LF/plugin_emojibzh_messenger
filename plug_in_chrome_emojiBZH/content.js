console.log("[emojiBZH] Le plug-in est bien chargé !");

//******************vars globales******************
  //photos
    let sacrifice ="https://static.xx.fbcdn.net/images/emoji.php/v9/tf3/1/32/1f3c1.png"; //32px
    let photoEmoji="https://raw.githubusercontent.com/Alexis-LF/plugin_emojibzh_messenger/master/plug_in_chrome_emojiBZH/img/photoEmoji32.png";
    let photoEmoji128 = "https://raw.githubusercontent.com/Alexis-LF/plugin_emojibzh_messenger/master/plug_in_chrome_emojiBZH/img/photoEmoji128.png";
  //déclaration balises du DOM
    const barreDuBas = document.getElementsByClassName("_5irm _7mkm")[0];
    const barreEcriture = document.getElementsByClassName("_1mf _1mj")[0];
    const boutonPanelEmojis = document.getElementsByClassName("_30yy _7odb")[0];
    let sectionPanelEmojis = null;


//******************évènements******************

testBontonJaime();//dès le chargement
document.body.addEventListener("keyup",evenement);
document.body.addEventListener("keypress",evenement);
barreDuBas.addEventListener("click",evenement);
document.body.addEventListener("mousemove",evenement);

//doit attendre que le bouton d'envoi soit remplacé
document.body.addEventListener("mouseup", function(){
      setTimeout(function()
      {
          evenement();
      },10);
});


let compteurEvenements = 0;
function evenement()
{
  compteurEvenements++;
  //console.log(`[emojiBZH] evenement n°${compteurEvenements}`);
  testBontonJaime();
  drapeauxDansMessages();

}

//pour le panel d'émojis
let panelOuvert = false;
boutonPanelEmojis.addEventListener("click",clicPanelEmojis);




//*****************👍basDroite => emojiBZH******************
function testBontonJaime()
{
  //à charger:
      //dès le début
      //lors d'un changement de discussion
      //quand msg envoyé ou pas écrit (caractères ? entrée ? appui envoyer ?)

  let boutonJaime;
  //console.log("[emojiBZH] Recherche du bouton j'aime...");

  if ( barreDuBas.lastChild.getAttribute("class") === "_5j_u _30yy _4rv9 _6ymq _7v3t" )
  {
      //console.log(`[emojiBZH] bouton j'aime trouvé!`);
      boutonJaime = document.getElementsByClassName("_5j_u _30yy _4rv9 _6ymq _7v3t")[0];
  }
  else
  {
    console.log(`[emojiBZH] Le bouton j'aime n'est pas affiché à l'écran.`);
    return;
  }

  let imgBoutonJaime = boutonJaime.firstChild.getAttribute("src")

  if ( imgBoutonJaime === sacrifice)
  {
    //console.log(`[emojiBZH] le drapeau de course est le bouton j'aime!\nIl va falloir le remplacer...`);
    boutonJaime.firstChild.setAttribute("src", photoEmoji);
  }
  else if (imgBoutonJaime === photoEmoji )
  {
    //console.log(`[emojiBZH] Après test, le drapeau breton est déja appliqué !`);
  }
  else
  {
    //console.log(`[emojiBZH] Ce n'est pas l'emoji drapeau de course qui est appliqué\nIl faut séléctionner cet émoji pour mettre l'émoji breton en tant que bouton j'aime.`);
  }

}


function drapeauxDansMessages()
{
  //on récupère les élmt qui contiennent le drapeau

    //cas des gros émojis
      let divGrosEmoji = document.getElementsByTagName("div");
      let grosDrapeaux = [];
      for (var i = 0 ; i < divGrosEmoji.length ; i++)
      {
        if ( divGrosEmoji[i].getAttribute("aria-label") === "🏁" )
        {
          grosDrapeaux.push(divGrosEmoji[i]);
        }
      }

    //cas des émojis dans les msg texte
      let emojisDansMsg = document.getElementsByTagName("img");
      let petitsDrapeaux = [];
      for (var i = 0 ; i < emojisDansMsg.length ; i++)
      {
        if ( emojisDansMsg[i].getAttribute("alt") === "🏁" )
        {
          petitsDrapeaux.push(emojisDansMsg[i]);
        }
      }

  //on remplace !
    //cas des gros émojis
      for (var i = 0 ; i < grosDrapeaux.length ; i++ )
      {
        grosDrapeaux[i].firstChild.setAttribute("src",photoEmoji128);
      }

    //cas des émojis dans les msg texte
    for (var i = 0 ; i < petitsDrapeaux.length ; i++ )
    {
      petitsDrapeaux[i].setAttribute("src",photoEmoji);
    }
}

function clicPanelEmojis ()
{
  if (panelOuvert === false)
  {
    panelOuvert = true;
  }
  else
  {
    //ne pas éxécuter la fonction car il est en train de se fermer
    panelOuvert = false;
    return;
  }
  panelEmojis2()
}

function panelEmojis2 ()
{
  //attendre que le panel soit ouvert
  setTimeout(function()
  {
    console.log(`[emojiBZH] et on rentre dans panelEmojis3...`);
    panelEmojis3();

  },500);
}


function panelEmojis3()
{
  console.log(`[emojiBZH] on est bien rentés dans panelEmojis3() `);


    let sectionPanelEmojis  = document.getElementsByClassName("_1uwv")[0];

  if (sectionPanelEmojis === undefined) //si ça n'a pas bien chargé
  {
    console.log(`[emojiBZH] le panel n'a pas eu le temps de charger ! retour à panelEmojis2 `);
    panelEmojis2();
  }
  else
  {
    console.log(`[emojiBZH] apparemment sectionPanelEmojis vaut ${sectionPanelEmojis} !`);

    sectionPanelEmojis.addEventListener("click",function(){
          setTimeout(function()
          {
              panelEmojis3();
          },100);
    });

  }




  console.log(`[emojiBZH] panel des émojis en action`);
  let listeEmojisDuPanel = document.getElementsByClassName(" _4rlu");
  console.log(listeEmojisDuPanel);
  for (var i = 0 ; i < listeEmojisDuPanel.length ; i++)
  {
    if (listeEmojisDuPanel[i].firstChild.firstChild.getAttribute("src") === sacrifice)
    {
      console.log(`[emojiBZH] un drapeau a été trouvé !`);
      listeEmojisDuPanel[i].firstChild.firstChild.setAttribute("src",photoEmoji128);
      return;
    }
    else
    {
      console.log(`[emojiBZH] l'émoji n°${i} n'est pas un drapeau :'( `);
    }
  }

}
