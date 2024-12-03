local p2 = {}

--- Solve Mull It Over
---
--- @param input string
--- @return integer
p2.solve = function(input)
  local n = 0

  local enabled = true
  for instruction, a, b in string.gmatch(input, "([%w']+)%((%d*),?(%d*)%)") do
    if string.match(instruction, "mul$") then
      if enabled and a ~= '' and b ~= '' then
        n = n + (a * b)
      end
    elseif string.match(instruction, "don't$") then
      enabled = false
    elseif string.match(instruction, "do$") then
      enabled = true
    end
  end

  return n
end

return p2
