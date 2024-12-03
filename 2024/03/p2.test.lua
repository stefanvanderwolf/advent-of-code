local p2 = require(".2024.03.p2")

io.write("--- 2024/03/p2.lua ---\n")

do
  io.write("- example:\n")
  local example = "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))"
  local n = p2.solve(example)
  local expected = 48
  assert(n == expected, string.format("Expected %d, but was %d", expected, n))
  io.write("ok\n")
end

do
  io.write("\n- input: \n")
  local file = io.open("./2024/03/assets/input.txt", "r")
  assert(file ~= nil, "Unable to open input")
  local input = file:read("*a")
  local n = p2.solve(input)
  local expected = 82857512
  assert(n == expected, string.format("Expected %d, but was %d", expected, n))
  io.write("ok\n")
end
