import '../../globalAugmentations.d'

Array.prototype.shuffle = function shuffle<T>(): void {
  // Fisher-Yates algorithm
  for (let i = this.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));      
      [this[i], this[j]] = [this[j], this[i]];
  }
};
