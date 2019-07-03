# Data Visualization Challenge: Visualize Inequality

This repository contains the code used to generate a submission that won [3rd place](http://hdr.undp.org/en/content/2019-human-development-data-visualization-challenge-winner-gender-inequality-visual-story) in the [Data Visualization Challenge](http://hdr.undp.org/en/data-visualization-challenge-2019) organized by the _United Nations Development Programme Human Development Reports_. 

The submission lives at [income-inequality.info](http://income-inequality.info)

![Income Inequality](https://raw.githubusercontent.com/whyboris/income-inequality.info/master/images/7.png)

The website files are located in another GitHub repository: [Income-Inequality](https://github.com/whyboris/income-inequality.info)

To report errors, ask questions, or offer corrections, please use the _Issues_ section on this or the other repository.

## Notes

I tried to document my steps and processing. Please let me know if you'd like me to clarify, elaborate, or better-organize this repository.

There were very few steps I had to perform manually (without running a script), primarily cleaning the _.csv_ file headers for the _Pandas_ library to be able to read the files. Another manual step was dealing with the data for China, which was split into two categories: _urban_ and _rural_. Only four countries had to be removed from the original dataset before the final export (there was trouble with PPP conversion).

## Outline

Files are numbered for convenience and in rough chronological order:

01 - Generates the 1st, 2nd, and 3rd figures on the website

02 - Generates the 4th - 8th figures
