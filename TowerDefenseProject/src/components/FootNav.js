import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { FormLabel } from '@mui/material';

//FPS Logic - this will need to be in the main game loop to properlu get the fps

document.addEventListener('DOMContentLoaded', (event) => {
    function handleDrop(e) {
        e.stopPropagation();
      var dragSrcEl;
        if (dragSrcEl !== this) {
          dragSrcEl.innerHTML = this.innerHTML;
          this.innerHTML = e.dataTransfer.getData('canvas');
        }
      
        return false;
      }
    function handleDragStart(e) {
      this.style.opacity = '0.4';

      var dragSrcEl = this;

      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('canvas', this.innerHTML);
    }
  
    function handleDragEnd(e) {
      this.style.opacity = '1';
  
      items.forEach(function (item) {
        item.classList.remove('over');
      });
    }
  
    function handleDragOver(e) {
      e.preventDefault();
      return false;
    }
  
    function handleDragEnter(e) {
      this.classList.add('over');
    }
  
    function handleDragLeave(e) {
      this.classList.remove('over');
    }
  
    let items = document.querySelectorAll('.container .box');
    items.forEach(function(item) {
      item.addEventListener('dragstart', handleDragStart);
      item.addEventListener('dragover', handleDragOver);
      item.addEventListener('dragenter', handleDragEnter);
      item.addEventListener('dragleave', handleDragLeave);
      item.addEventListener('dragend', handleDragEnd);
      item.addEventListener('drop', handleDrop);
    });
  });


// start button



// reset button



// status  bar



const FootNav = () => {
    return (
        <div className="main-footer">
        <div className="container">
          <div className="row">
            {/* Column1 */}
            <div className="col">
              <h4> Button</h4>
              <h4> Button</h4>
            </div>
            {/* Column2 */}
            <div className="col">
              <h4>Towers</h4>
              <div draggable="true" class="box">Tower 1</div>
              <div draggable="true" class="box">Tower 2</div>
              <div draggable="true" class="box">Tower 3</div>
            </div>
            <div className="col">
              <h4> Score:</h4>
              <h4> FPS:</h4>
            </div>
          </div>
          <hr />
        </div>
      </div>
    );
}

export default FootNav;