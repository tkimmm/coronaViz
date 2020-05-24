let infectCount = 2;
export function Person(svg, x, y, id, color, aoa, weight) {
    this.posX = x; 
    this.posY = y; 
    this.color = color;
    this.radius = weight; 
    this.jumpSize = 1; 
    this.svg = svg; 
    this.id = id; 
    this.aoa = aoa; 
    this.weight = weight;
    this.color == 'red' ? this.infectStatus = true : this.infectStatus = false
    if (!this.aoa)
        this.aoa = Math.PI / 7;
    if (!this.weight)
        this.weight = 10;
    this.radius = this.weight;

    this.data = [this.id]; 
    this.infectCount = 1;
    var thisobj = this;

    this.vx = Math.cos(thisobj.aoa) * thisobj.jumpSize; 
    this.vy = Math.sin(thisobj.aoa) * thisobj.jumpSize; 
    this.initialVx = this.vx;
    this.initialVy = this.vy;
    this.initialPosX = this.posX;
    this.initialPosY = this.posY;

    // when speed changes, go to initial setting
    this.GoToInitialSettings = function (newjumpSize) {
        thisobj.posX = thisobj.initialPosX;
        thisobj.posY = thisobj.initialPosY;
        thisobj.vx = Math.cos(thisobj.aoa) * newjumpSize; // velocity x
        thisobj.vy = Math.sin(thisobj.aoa) * newjumpSize; // velocity y
        thisobj.Draw();
    }

    this.Move = function () {
        var svg = thisobj.svg;


        thisobj.posX += thisobj.vx;
        thisobj.posY += thisobj.vy;

        if (parseInt(svg.attr('width')) <= (thisobj.posX + thisobj.radius)) {
            thisobj.posX = parseInt(svg.attr('width')) - thisobj.radius - 1;
            thisobj.aoa = Math.PI - thisobj.aoa;
            thisobj.vx = -thisobj.vx;
        }

        if ( thisobj.posX < thisobj.radius) {
            thisobj.posX = thisobj.radius+1;
            thisobj.aoa = Math.PI - thisobj.aoa;
            thisobj.vx = -thisobj.vx;
        }

        if (parseInt(svg.attr('height')) < (thisobj.posY + thisobj.radius)) {
            thisobj.posY = parseInt(svg.attr('height')) - thisobj.radius - 1;
            thisobj.aoa = 2 * Math.PI - thisobj.aoa;
            thisobj.vy = -thisobj.vy;
        }

        if (thisobj.posY < thisobj.radius) {
            thisobj.posY = thisobj.radius+1;
            thisobj.aoa = 2 * Math.PI - thisobj.aoa;
            thisobj.vy = -thisobj.vy;
        }

        if (thisobj.aoa > 2 * Math.PI)
            thisobj.aoa = thisobj.aoa - 2 * Math.PI;
        if (thisobj.aoa < 0)
            thisobj.aoa = 2 * Math.PI + thisobj.aoa;

        thisobj.Draw();
    }

    this.Draw = function() {
        var svg = thisobj.svg;
        var person = svg.selectAll('#' + thisobj.id)
                    .data(thisobj.data);
        
        
        thisobj.infectStatus == true ? thisobj.color = 'red' : thisobj.color == 'pink';
        
        person.enter()
        .append("circle")
        .attr("id", thisobj.id)
        .attr("class", "ball")
        .attr('r', thisobj.radius)
        .attr('weight', thisobj.weight)
         
        
        person
        .attr("cx", thisobj.posX)
        .attr("cy", thisobj.posY)
        .style("fill", thisobj.color);
    }

    this.infected = function () {
        thisobj.infectStatus = true;
        thisobj.Draw();
        let count = svg.select('#wow')
        infectCount < 7 ? 
        count.text('Infected Count: ' + infectCount) :
        count.text('Everybody Infected :(') 

    }

}


export function ProcessCollision(person1, person2, peopleArray) {
    let people = peopleArray
    if (person2 <= person1)
        return;
    if (person1 >= (people.length-1) || person2 >= people.length )
        return;

    person1 = people[person1];
    person2 = people[person2];

    if (checkCollision(person1, person2) ) {
        // intersection point
    var interx = ((person1.posX * person2.radius) + person2.posX * person1.radius)
        / (person1.radius + person2.radius);
        var intery = ((person1.posY * person2.radius) + person2.posY  * person1.radius)
        / (person1.radius + person2.radius);

        // calculate new velocity of each person.
        var vx1 = (person1.vx * (person1.weight - person2.weight)
            + (2 * person2.weight * person2.vx )) / (person1.weight + person2.weight);
        var vy1 = (person1.vy * (person1.weight - person2.weight)
            + (2 * person2.weight * person2.vy)) / (person1.weight + person2.weight);
        var vx2 = (person2.vx * (person2.weight - person1.weight)
            + (2 * person1.weight * person1.vx)) / (person1.weight + person2.weight);
        var vy2 = (person2.vy * (person2.weight - person1.weight)
            + (2 * person1.weight * person1.vy)) / (person1.weight + person2.weight);

      
        //set velocities for both people
        person1.vx = vx1;
        person1.vy = vy1;
        person2.vx = vx2;
        person2.vy = vy2;

        //ensure one person is not inside others. distant apart till not colliding
        while (checkCollision(person1, person2)) {
            person1.posX += person1.vx;
            person1.posY += person1.vy;

            person2.posX += person2.vx;
            person2.posY += person2.vy;
        }
        // check infected or not
        if (person1.infectStatus == true && person2.infectStatus == false || person1.infectStatus == false && person2.infectStatus == true ){
            person1.infected();
            person2.infected();
            infectCount++
          
        } else {
            person1.Draw();
            person2.Draw();
        }
    }
}

export function checkCollision(person1, person2) {
    let absx = Math.abs(parseFloat(person2.posX) - parseFloat(person1.posX));
    let absy = Math.abs(parseFloat(person2.posY) - parseFloat(person1.posY));

    // find distance between two people.
    let distance = (absx * absx) + (absy * absy);
    distance = Math.sqrt(distance);
    // check if distance is less than sum of two radius - if yes, collision
    if (distance < (parseFloat(person1.radius) + parseFloat(person2.radius))) {
        return true;
    }
    return false;
}

export function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

