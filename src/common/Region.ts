class Region {
  constructor(
    public x: number,
    public y: number,
    public w: number,
    public h: number
  ) {}

  static isProperRegion(
    region: number[]
  ): region is [number, number, number, number] {
    return region.length === 4
  }

  toArray(): [number, number, number, number] {
    return [this.x, this.y, this.w, this.h]
  }
}

export default Region
