# Wrapping C code for numpy with Cython

overall docs very good but just felt like I was struggling to make a few connection. this hopefully fills in those gaps

**pybind11**
Add a note here about why not using pybind11 (or maybe link to some ruminations at bottom of the page)
  - I didn't know about it
  - Seems like Cython is for you know python and want it faster
  - pybind 11 is more of you know C++ and want it to be available in python
  - Cython lower barrier to entry for me
    - that said I still felt compelled to write this so it clearly wasn't low barrier to entry. Will try to do the same project with pybind11 and see if it's easier.
  
**numba?**
probably easier - also offloads difficulty of build c/c++ extensions to someone else. Can't get things like finegrained openmp pragmas, but otherwise performance the same as my naive cython implementation


- Constantly googling things like: "how to loop over 2d array numpy cython"
    - lots of good examples of writing custom loops to deal with numpy in cython but not so many showing how to pass a numpy array to a wrapped C++ library, or custom c++ code that you wrote in it's own file.
    - how to pass numpy array to c++ cython
    - Key insight is that you don't give the fully array object to C/C++ instead you give a pointer to the data and some information. This is the single pointer approach (fast_overlap)
    - alternatively you can do the pointer of pointers approach (BDS-sampler) following https://stackoverflow.com/questions/40754724/passing-numpy-arrays-in-cython-to-a-c-function-that-requires-dynamically-allocat/42000268#42000268
- 
about the shape (size + strides) and then loop over it.

- TODO: fused types
    - https://cython.readthedocs.io/en/latest/src/userguide/numpy_tutorial.html#more-generic-code 
- naming the extension module
  - so it doesn't conflict with __init__.py
  - e.g. naming it: package_name._engine

- publishing using ci buildwheel
  - compiling with things like `openmp` is a real hassle
  - need to match the extension compiler to python compiler (there's a list)
- how to run development cycle
  - maybe could just call `cython` and then `


- Tests!
  - in Github actions making sure that it's built if using local, or excising from sys.path if installing from wheel https://github.com/Hekstra-Lab/fast-overlap/pull/9


### 2D sum

This is a silly example because you don't need to have a separate c file. Although if you create a separate c++ file then you can more easily use fine grained openmp pragmas so you can access the same element of a numpy array without fighting.

`c_engine.cpp`
```c++
int sum_2d(int *)
```