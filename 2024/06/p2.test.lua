local p2 = require(".2024.06.p2")

io.write("--- 2024/06/p2.lua ---\n")

do
  io.write("- example:\n")
  local example = [[....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...
]]
  local n = p2.solve(example)
  local expected = 6
  assert(n == expected, string.format("Expected %d, but was %d", expected, n))
  io.write("ok\n")
end

do
  io.write("\n- input: \n")
  local file = io.open("./2024/06/assets/input.txt", "r")
  assert(file ~= nil, "Unable to open input")
  local input = file:read("*a")
  local n = p2.solve(input)
  local expected = 1909
  assert(n == expected, string.format("Expected %d, but was %d", expected, n))
  io.write("ok\n")
end
