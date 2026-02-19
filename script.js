document.addEventListener('DOMContentLoaded', function(){
  const acceptBtn = document.getElementById('acceptBtn');
  const modal = document.getElementById('modal');
  const stage = document.querySelector('.stage');

  // Accept button shows modal
  acceptBtn.addEventListener('click', function(){
    const gif = document.getElementById('modalGif');
    if(gif){ gif.style.display = 'block'; }
    modal.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
    // focus modal for accessibility
    modal.setAttribute('tabindex','-1');
    modal.focus();
  });

  // Allow closing modal by clicking on overlay (outside modal card)
  modal.addEventListener('click', function(e){
    if (e.target === modal) {
      modal.setAttribute('aria-hidden','true');
      document.body.style.overflow = '';
    }
  });

  // close with Escape
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape'){
      modal.setAttribute('aria-hidden','true');
      document.body.style.overflow = '';
    }
  });
});
