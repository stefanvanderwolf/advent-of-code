local p1 = require(".2024.02.p2")

io.write("--- 2024/02/p2.lua ---\n")

do
  io.write("- example:\n")
  local example = [[7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9
]]
  local n = p1.solve(example)
  local expected = 4
  assert(n == expected, string.format("Expected %d, but was %d", expected, n))
  io.write("ok\n")
end

do
  io.write("\n- input: \n")
  local file = io.open("./2024/02/assets/input.txt", "r")
  assert(file ~= nil, "Unable to open input")
  local input = file:read("*a")
  local n = p1.solve(input)
  local expected = 674
  assert(n == expected, string.format("Expected %d, but was %d", expected, n))
  io.write("ok\n")
end
