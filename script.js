document.addEventListener('DOMContentLoaded', function(){
  const acceptBtn = document.getElementById('acceptBtn');
  const rejectBtn = document.getElementById('rejectBtn');
  const modal = document.getElementById('modal');
  const stage = document.querySelector('.stage');
  const buttons = document.querySelector('.buttons');

  // ensure stage can be reference for absolute positioning
  stage.style.position = stage.style.position || 'relative';

  // initialize reject button as absolute so we can move it anywhere inside stage
  function initRejectPosition(){
    const r = rejectBtn.getBoundingClientRect();
    // place relative to viewport so it never leaves the visible area
    const left = r.left;
    const top = r.top;
    rejectBtn.style.position = 'fixed';
    rejectBtn.style.left = Math.max(8, left) + 'px';
    rejectBtn.style.top = Math.max(8, top) + 'px';
    rejectBtn.style.zIndex = 9999;
    rejectBtn.classList.add('moving');
  }

  // move the reject button to a random place within the stage
  function moveReject(){
    const b = rejectBtn.getBoundingClientRect();
    const btnW = b.width; const btnH = b.height;
    const padding = 12; // keep some padding from edges
    const minY = 80; // keep some space from the top (header)
    const maxX = Math.max(0, window.innerWidth - btnW - padding);
    const maxY = Math.max(0, window.innerHeight - btnH - padding);
    // compute random X within [padding, maxX]
    const randX = Math.floor(Math.random() * (maxX - padding + 1)) + padding;
    // compute random Y within [minY, maxY] but fallback to padding if space is small
    let randY;
    if (maxY <= minY) { randY = padding; } else { randY = Math.floor(Math.random() * (maxY - minY + 1)) + minY; }

    // apply using transform for smooth transition, then commit new left/top
    const currLeft = parseFloat(rejectBtn.style.left) || b.left;
    const currTop = parseFloat(rejectBtn.style.top) || b.top;
    const deltaX = randX - currLeft;
    const deltaY = randY - currTop;
    rejectBtn.style.transform = `translate3d(${deltaX}px, ${deltaY}px, 0)`;

    // after animation ends, set left/top to new position and clear transform for next move
    rejectBtn.addEventListener('transitionend', function handler(e){
      if (e.propertyName !== 'transform') return;
      rejectBtn.removeEventListener('transitionend', handler);
      rejectBtn.style.left = randX + 'px';
      rejectBtn.style.top = randY + 'px';
      rejectBtn.style.transform = 'none';
    });
  }

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

  // move on click, mouseenter and touchstart to be playful and unreachable
  rejectBtn.addEventListener('click', function(e){
    e.preventDefault();
    moveReject();
  });
  rejectBtn.addEventListener('mouseenter', function(){ moveReject(); });
  rejectBtn.addEventListener('touchstart', function(e){ e.preventDefault(); moveReject(); }, {passive:false});

  // on window resize recompute a sensible position
  window.addEventListener('resize', function(){
    initRejectPosition();
  });

  // Ensure initialization after layout
  setTimeout(initRejectPosition, 120);
});
