// Ecouteurs globaux extraits du fichier historique.
// dash-todo-focus-stable-v2019 : évite tout rafraîchissement pendant la saisie Todo.
document.addEventListener("focusin", function(e){
  if(isTodoField(e.target)){
    ui.todoEditing=true;
  }
});
document.addEventListener("focusout", function(e){
  if(isTodoField(e.target)){
    saveTodoFromFields();
    ui.todoEditing=false;
    saveTodoCloudDelayed();
  }
});


// global-search-keydown-v2020
document.addEventListener("keydown", function(e){
  if(e.target && e.target.id==="globalSearchInput" && e.key==="Escape"){
    clearGlobalSearch();
  }
});
document.addEventListener("click", function(e){
  var wrap=e.target.closest && e.target.closest(".global-search");
  if(!wrap && e.target.id!=="globalSearchInput"){
    var box=document.getElementById("globalSearchResults");
    if(box){ box.className="global-results"; }
  }
});
